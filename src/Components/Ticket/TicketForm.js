import React from "react";

function TicketForm() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-[40em] mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Submit a Ticket</h2>
      <form>
        {/* Issue Title */}
        <div className="mb-4">
          <label htmlFor="issue-title" className="block text-sm font-medium text-gray-700">
            Issue Title
          </label>
          <input
            type="text"
            id="issue-title"
            name="issue-title"
            placeholder="Enter a brief summary"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Provide detailed information"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>
        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          >
            <option value="">--Select Category--</option>
            <option value="payment">Payment Issues</option>
            <option value="account">Account Issues</option>
            <option value="technical">Technical Support</option>
          </select>
        </div>
        {/* Priority */}
        <div className="mb-4">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        {/* Attachments */}
        <div className="mb-4">
          <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
            Attachments
          </label>
          <input
            type="file"
            id="attachments"
            name="attachments"
            accept=".png,.pdf,.docx"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
}

export default TicketForm;
