
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const mockHotelManagers = [
  { 
    id: 1, 
    name: 'John Smith', 
    mobile: '9876543210', 
    email: 'john@grandhotel.com', 
    status: 'Approved',
    profilePhoto: null,
    hotelName: 'Grand Hotel',
    businessLicense: null,
    hotelPhotos: [],
    address: '123 Main Street',
    city: 'New York',
    locality: 'Manhattan',
    landmark: 'Central Park',
    pincode: '10001',
    totalRooms: 50,
    standardRooms: {
      price: 100,
      count: 30,
      amenities: ['WiFi', 'TV', 'AC'],
      photos: []
    },
    luxuryRooms: {
      price: 200,
      count: 20,
      amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Jacuzzi'],
      photos: []
    },
    policy: {
      checkinTime: '12:00',
      checkoutTime: '10:00',
      amenities: ['Swimming Pool', 'Gym', 'Restaurant'],
      policyDocuments: null
    },
    bankDetails: {
      accountNumber: '1234567890',
      documentProof: null
    },
    idCardFront: null,
    idCardBack: null
  }
];

const HotelManagerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewManager = id === 'new';
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    profilePhoto: null,
    hotelName: '',
    businessLicense: null,
    hotelPhotos: [],
    address: '',
    city: '',
    locality: '',
    landmark: '',
    pincode: '',
    totalRooms: 0,
    standardRooms: {
      price: 0,
      count: 0,
      amenities: ['WiFi', 'TV', 'AC'],
      photos: []
    },
    luxuryRooms: {
      price: 0,
      count: 0,
      amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'],
      photos: []
    },
    policy: {
      checkinTime: '12:00',
      checkoutTime: '10:00',
      amenities: [],
      policyDocuments: null
    },
    bankDetails: {
      accountNumber: '',
      documentProof: null
    },
    idCardFront: null,
    idCardBack: null
  });

  useEffect(() => {
    if (!isNewManager) {
      const manager = mockHotelManagers.find(m => m.id === parseInt(id));
      if (manager) {
        setFormData(manager);
      } else {
        toast({
          title: "Manager not found",
          description: "The hotel manager you're looking for doesn't exist",
          variant: "destructive"
        });
        navigate('/hotel-management/managers');
      }
    }
  }, [id, isNewManager, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const handleNestedFileChange = (category, field, e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: file
        }
      }));
    }
  };

  const handleMultipleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      [field]: files
    }));
  };

  const handleNestedMultipleFileChange = (category, field, e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: files
      }
    }));
  };

  const handleAmenitiesChange = (category, value) => {
    setFormData(prev => {
      const currentAmenities = prev[category].amenities || [];
      let newAmenities;
      
      if (currentAmenities.includes(value)) {
        newAmenities = currentAmenities.filter(item => item !== value);
      } else {
        newAmenities = [...currentAmenities, value];
      }
      
      return {
        ...prev,
        [category]: {
          ...prev[category],
          amenities: newAmenities
        }
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the data to an API
    console.log("Form submitted:", formData);
    
    toast({
      title: isNewManager ? "Manager created" : "Manager updated",
      description: isNewManager 
        ? "New hotel manager has been successfully created" 
        : "Hotel manager details have been updated"
    });
    
    navigate('/hotel-management/managers');
  };

  const commonAmenities = ['WiFi', 'TV', 'AC', 'Mini Bar', 'Jacuzzi', 'Balcony', 'Room Service', 'Coffee Maker'];
  const commonHotelAmenities = ['Swimming Pool', 'Gym', 'Restaurant', 'Conference Room', 'Spa', 'Parking', 'Airport Shuttle'];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {isNewManager ? "Add New Hotel Manager" : "Edit Hotel Manager"}
        </h2>
        <button 
          onClick={() => navigate('/hotel-management/managers')}
          className="btn btn-secondary"
        >
          Back to Managers
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Profile Photo</label>
              <input 
                type="file" 
                accept="image/png,image/jpeg,application/pdf" 
                onChange={(e) => handleFileChange(e, 'profilePhoto')} 
                className="form-control"
              />
              {formData.profilePhoto && (
                <div className="mt-2">
                  {typeof formData.profilePhoto === 'string' ? (
                    <img src={formData.profilePhoto} alt="Profile" className="w-32 h-32 object-cover" />
                  ) : (
                    <p>File selected: {formData.profilePhoto.name}</p>
                  )}
                </div>
              )}
            </div>
            
            <div>
              <label className="block mb-1">Name</label>
              <input 
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">Mobile</label>
              <input 
                type="text"
                name="mobile"
                value={formData.mobile || ''}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">Email</label>
              <input 
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Hotel Details */}
        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-4">Hotel Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Hotel Name</label>
              <input 
                type="text"
                name="hotelName"
                value={formData.hotelName || ''}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">Business License</label>
              <input 
                type="file" 
                accept="image/png,image/jpeg,application/pdf" 
                onChange={(e) => handleFileChange(e, 'businessLicense')} 
                className="form-control"
              />
              {formData.businessLicense && (
                <p className="mt-2">File selected: {
                  typeof formData.businessLicense === 'string' 
                    ? formData.businessLicense 
                    : formData.businessLicense.name
                }</p>
              )}
            </div>
            
            <div className="col-span-2">
              <label className="block mb-1">Hotel Photos</label>
              <input 
                type="file" 
                multiple
                accept="image/png,image/jpeg" 
                onChange={(e) => handleMultipleFileChange(e, 'hotelPhotos')} 
                className="form-control"
              />
              {formData.hotelPhotos && formData.hotelPhotos.length > 0 && (
                <p className="mt-2">{formData.hotelPhotos.length} photos selected</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Location */}
        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-4">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block mb-1">Address</label>
              <input 
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">City</label>
              <input 
                type="text"
                name="city"
                value={formData.city || ''}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">Locality</label>
              <input 
                type="text"
                name="locality"
                value={formData.locality || ''}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            
            <div>
              <label className="block mb-1">Landmark</label>
              <input 
                type="text"
                name="landmark"
                value={formData.landmark || ''}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            
            <div>
              <label className="block mb-1">Pin Code</label>
              <input 
                type="text"
                name="pincode"
                value={formData.pincode || ''}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Room Details */}
        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-4">Room Details</h3>
          <div className="mb-4">
            <label className="block mb-1">Total Rooms</label>
            <input 
              type="number"
              name="totalRooms"
              value={formData.totalRooms || 0}
              onChange={handleChange}
              className="form-control"
              required
              min="0"
            />
          </div>
          
          {/* Standard Rooms */}
          <div className="border p-4 rounded-md mb-4">
            <h4 className="text-md font-medium mb-3">Standard Rooms</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Room Price</label>
                <input 
                  type="number"
                  value={formData.standardRooms?.price || 0}
                  onChange={(e) => handleNestedChange('standardRooms', 'price', parseInt(e.target.value) || 0)}
                  className="form-control"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block mb-1">Number of Rooms</label>
                <input 
                  type="number"
                  value={formData.standardRooms?.count || 0}
                  onChange={(e) => handleNestedChange('standardRooms', 'count', parseInt(e.target.value) || 0)}
                  className="form-control"
                  min="0"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block mb-2">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {commonAmenities.map(amenity => (
                    <div key={amenity} className="flex items-center">
                      <input 
                        type="checkbox"
                        id={`std-${amenity}`}
                        checked={(formData.standardRooms?.amenities || []).includes(amenity)}
                        onChange={() => handleAmenitiesChange('standardRooms', amenity)}
                        className="mr-2"
                      />
                      <label htmlFor={`std-${amenity}`}>{amenity}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block mb-1">Room Photos</label>
                <input 
                  type="file" 
                  multiple
                  accept="image/png,image/jpeg" 
                  onChange={(e) => handleNestedMultipleFileChange('standardRooms', 'photos', e)} 
                  className="form-control"
                />
              </div>
            </div>
          </div>
          
          {/* Luxury Rooms */}
          <div className="border p-4 rounded-md">
            <h4 className="text-md font-medium mb-3">Luxury Rooms</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Room Price</label>
                <input 
                  type="number"
                  value={formData.luxuryRooms?.price || 0}
                  onChange={(e) => handleNestedChange('luxuryRooms', 'price', parseInt(e.target.value) || 0)}
                  className="form-control"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block mb-1">Number of Rooms</label>
                <input 
                  type="number"
                  value={formData.luxuryRooms?.count || 0}
                  onChange={(e) => handleNestedChange('luxuryRooms', 'count', parseInt(e.target.value) || 0)}
                  className="form-control"
                  min="0"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block mb-2">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {commonAmenities.map(amenity => (
                    <div key={amenity} className="flex items-center">
                      <input 
                        type="checkbox"
                        id={`lux-${amenity}`}
                        checked={(formData.luxuryRooms?.amenities || []).includes(amenity)}
                        onChange={() => handleAmenitiesChange('luxuryRooms', amenity)}
                        className="mr-2"
                      />
                      <label htmlFor={`lux-${amenity}`}>{amenity}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block mb-1">Room Photos</label>
                <input 
                  type="file" 
                  multiple
                  accept="image/png,image/jpeg" 
                  onChange={(e) => handleNestedMultipleFileChange('luxuryRooms', 'photos', e)} 
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Policy */}
        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-4">Policy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Check-in Time</label>
              <input 
                type="time"
                value={formData.policy?.checkinTime || '12:00'}
                onChange={(e) => handleNestedChange('policy', 'checkinTime', e.target.value)}
                className="form-control"
              />
            </div>
            
            <div>
              <label className="block mb-1">Check-out Time</label>
              <input 
                type="time"
                value={formData.policy?.checkoutTime || '10:00'}
                onChange={(e) => handleNestedChange('policy', 'checkoutTime', e.target.value)}
                className="form-control"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-2">Hotel Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {commonHotelAmenities.map(amenity => (
                  <div key={amenity} className="flex items-center">
                    <input 
                      type="checkbox"
                      id={`policy-${amenity}`}
                      checked={(formData.policy?.amenities || []).includes(amenity)}
                      onChange={() => handleAmenitiesChange('policy', amenity)}
                      className="mr-2"
                    />
                    <label htmlFor={`policy-${amenity}`}>{amenity}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-1">Policy Documents</label>
              <input 
                type="file" 
                accept="application/pdf" 
                onChange={(e) => handleNestedFileChange('policy', 'policyDocuments', e)} 
                className="form-control"
              />
              {formData.policy?.policyDocuments && (
                <p className="mt-2">File selected: {
                  typeof formData.policy.policyDocuments === 'string' 
                    ? formData.policy.policyDocuments 
                    : formData.policy.policyDocuments.name
                }</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Bank Details */}
        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Bank Account Number</label>
              <input 
                type="text"
                value={formData.bankDetails?.accountNumber || ''}
                onChange={(e) => handleNestedChange('bankDetails', 'accountNumber', e.target.value)}
                className="form-control"
              />
            </div>
            
            <div>
              <label className="block mb-1">Bank Account Details</label>
              <input 
                type="file" 
                accept="image/png,image/jpeg,application/pdf" 
                onChange={(e) => handleNestedFileChange('bankDetails', 'documentProof', e)} 
                className="form-control"
              />
              {formData.bankDetails?.documentProof && (
                <p className="mt-2">File selected: {
                  typeof formData.bankDetails.documentProof === 'string' 
                    ? formData.bankDetails.documentProof 
                    : formData.bankDetails.documentProof.name
                }</p>
              )}
            </div>
          </div>
        </div>
        
        {/* ID Cards */}
        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-4">ID Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">ID Card Front</label>
              <input 
                type="file" 
                accept="image/png,image/jpeg,application/pdf" 
                onChange={(e) => handleFileChange(e, 'idCardFront')} 
                className="form-control"
              />
              {formData.idCardFront && (
                <p className="mt-2">File selected: {
                  typeof formData.idCardFront === 'string' 
                    ? formData.idCardFront 
                    : formData.idCardFront.name
                }</p>
              )}
            </div>
            
            <div>
              <label className="block mb-1">ID Card Back</label>
              <input 
                type="file" 
                accept="image/png,image/jpeg,application/pdf" 
                onChange={(e) => handleFileChange(e, 'idCardBack')} 
                className="form-control"
              />
              {formData.idCardBack && (
                <p className="mt-2">File selected: {
                  typeof formData.idCardBack === 'string' 
                    ? formData.idCardBack 
                    : formData.idCardBack.name
                }</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <button 
            type="button" 
            onClick={() => navigate('/hotel-management/managers')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="btn btn-primary"
          >
            {isNewManager ? "Create Manager" : "Update Manager"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelManagerDetails;
