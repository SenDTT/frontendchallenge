import { useState } from 'react';
import { IPrefillDataProps, FormField, DependencyFields, ISelectedPrefillField } from '../types';
import { getDependencyFields } from '../utils/graph';
import { globalData } from '../data';

const PrefillData = ({
    fields,
    targetFieldId,
    selected: _selected, // Ignored, managed by state
    currentNodeId,
    currentData,
    onSubmit,
}: IPrefillDataProps) => {
    const [selectedPrefill, setSelectedPrefill] = useState <ISelectedPrefillField[]>([]);
    const [openToggles, setOpenToggles] = useState<{ [key: string]: boolean }>({});

    const dependencyFields: DependencyFields[] = getDependencyFields(currentNodeId);
    const allSources: Array<DependencyFields> = [
        ...dependencyFields,
        {
            formId: "0",
            formName: "global",
            fields: globalData,
        },
    ];

    const targetField = (currentData as any)?.fields?.find?.((f: FormField) => f.id === targetFieldId);
    const compatibleFields = (fields: FormField[]) =>
        fields.filter((f) => !targetField || f.type === targetField.type);

    const toggleSection = (id: string) => {
        setOpenToggles((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSelectField = (sourceId: string, field: string) => {
        if (selectedPrefill.find((i) => i.sourceId === sourceId && i.field === field)) {
            setSelectedPrefill((prev) => prev.filter(i => !(i.sourceId === sourceId && i.field === field)));
        } else {
            setSelectedPrefill(prev => [...prev, { sourceId, field, targetId: targetFieldId }])
        }
    };

    const handleSave = () => {
        if (selectedPrefill) {
            onSubmit(currentNodeId, targetFieldId, selectedPrefill);
        }
    };

    const isSeletedField = (sourceId: string, fieldId: string) => {
        return selectedPrefill.find((i) => i.sourceId === sourceId && i.field === fieldId);
    }

    return (
        <div className="p-4">
            <div>
                {allSources.map((source) => (
                    <div key={source.formId} className="mb-2">
                        <button
                            type="button"
                            onClick={() => toggleSection(source.formId)}
                            className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md flex justify-between items-center"
                        >
                            <span>{source.formName}</span>
                            <span>{openToggles[source.formId] ? '−' : '+'}</span>
                        </button>
                        {openToggles[source.formId] && (
                            <div className="ml-4 mt-2">
                                {compatibleFields(source.fields).length > 0 ? (
                                    compatibleFields(source.fields).map((field) => (
                                        <div
                                            key={field.id}
                                            className={`p-2 cursor-pointer hover:bg-gray-100 rounded-md ${isSeletedField(source.formId, field.id)
                                                ? 'bg-blue-100'
                                                : ''
                                                }`}
                                            onClick={() => handleSelectField(source.formId, field.id)}
                                        >
                                            {field.label} ({field.id})
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-2 text-gray-500">No compatible fields</div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                    Save
                </button>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default PrefillData;