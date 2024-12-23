import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for navigation (redirect)
import Navbar from '../Navbar/Navbar';
import supabase from '../../supabaseClient/supabase';

const CampaignPage = () => {
  const navigate = useNavigate(); //for navigation
  const [step, setStep] = useState(1);
  const [campaignName, setCampaignName] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [deadline, setDeadline] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [campaignImages, setCampaignImages] = useState([]);
  const [template, setTemplate] = useState('Default');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const nextStep = () => {
    if (step === 1 && campaignName && goal && deadline) {
      setStep(2);
    } else if (step === 2 && bannerImage) {
      setStep(3);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleCampaignImages = (e) => {
    const files = Array.from(e.target.files);
    setCampaignImages(files);
  };

  const uploadImage = async (file, folder) => {
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${folder}/${sanitizedFileName}`;
    
    const storageBucket = 'campaign-assets'; 

    try {
      const { data, error } = await supabase
        .storage
        .from(storageBucket)
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      console.log('File uploaded successfully:', data);
      return data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error(error.message);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const bannerPath = await uploadImage(bannerImage, 'banners');
      const campaignImagePaths = await Promise.all(
        campaignImages.map((image) => uploadImage(image, 'campaign-images'))
      );

      const fakeUserId = '2b6aa0f6-59cd-43d7-bfa5-5a7843dad1ff'; // Replace with actual user ID

      const { data, error } = await supabase.from("Campaigns").insert([{
        title: campaignName,
        description,
        goal_amount: parseFloat(goal),
        end_date: deadline,
        template,
        creator_id: fakeUserId, // Temporary
      }]);

      if (error) {
        throw error;
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-indigo-100 py-[10em]'>
      <Navbar />
      <div className="bg-white p-6 rounded-lg shadow-md w-[40vw] mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">New Campaign Page</h2>
        
        {/* Step 1 */}
        {step === 1 && (
          <>
            <h3 className="text-xl font-semibold mb-4">Step 1: Information</h3>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">* Campaign Name</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Enter Campaign Name"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Description"
                  rows="2"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Goal (USD)</label>
                <input
                  type="number"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="0.00"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">* Deadline Date</label>
                <input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder="yyyy/mmm/dd"
                  className="mt-1 p-2 w-full border rounded-md"
                  pattern="\d{4}/[A-Za-z]{3}/\d{2}" // Regex pattern for validation
                  title="Format: yyyy/mmm/dd (e.g., 2024/Dec/25)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Template</label>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="Default">Default</option>
                  <option value="Modern">Modern</option>
                  <option value="Classic">Classic</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h3 className="text-xl font-semibold mb-4">Step 2: Upload Images</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">* Banner Image</label>
              <input
                type="file"
                onChange={(e) => setBannerImage(e.target.files[0])}
                className="mt-1"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Upload Campaign Images</label>
              <input
                type="file"
                multiple
                onChange={handleCampaignImages}
                className="mt-1"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <h3 className="text-xl font-semibold mb-4">Step 3: Review & Submit</h3>
            <p><strong>Campaign Name:</strong> {campaignName}</p>
            <p><strong>Goal:</strong> USD {goal}</p>
            <p><strong>Deadline:</strong> {deadline}</p>
            <p><strong>Banner Image:</strong> {bannerImage?.name}</p>
            <p><strong>Uploaded Campaign Images:</strong> {campaignImages.length} files</p>
            <p><strong>Template:</strong> {template}</p>

            {error && <p className="text-red-500 mt-4">Error: {error}</p>}

            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : isSuccess ? '✅ Success!' : 'Submit'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CampaignPage;
