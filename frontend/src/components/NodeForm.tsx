import { PropsNodeForm } from "../types";

const NodeForm = (props: PropsNodeForm) => {
    const { formData, onChange, onCancel, onSubmit, fields, openConfigPrefill } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit} className="node-form">
            {fields?.map((field) => (
                <div key={field.id} className="mb-4">
                    <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        {field.label}
                    </label>

                    {field.type === 'select' ? (
                        <select
                            id={field.id}
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            required={field.required}
                            className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        >
                            <option value="">Select...</option>
                            {field.options?.map((option: { label: string; value: any }) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            id={field.id}
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            required={field.required}
                            className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    )}
                </div>
            ))}

            <div className="flex justify-end space-x-2">
                <button type="button" className="btn btn-secondary text-sm" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="text-sm bg-indigo-600 text-white hover:bg-indigo-500">Submit</button>
            </div>
        </form>
    );
};

export default NodeForm;