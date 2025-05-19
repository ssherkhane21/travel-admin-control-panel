
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from "@/hooks/use-toast";

const mockBikeRiders = [
  { 
    id: 1, 
    name: 'Ravi Kumar', 
    mobile: '9876543210', 
    email: 'ravi@bikerider.com', 
    status: 'Approved',
    age: 25,
    address: '123 Main Road, Mumbai',
    city: 'Mumbai',
    locality: 'Andheri',
    landmark: 'Near City Mall',
    pincode: '400053',
    experience: 3,
    documents: {
      license: 'DL-987654321',
      insurance: 'INS-123456789'
    },
    vehicleDetails: {
      type: 'Bike',
      regNumber: 'MH02CD5678',
      insurance: 'INSU987654',
      certificate: 'RC987654321',
      photos: ['bike1.jpg', 'bike2.jpg']
    },
    idProofs: {
      front: 'id_front_ravi.jpg',
      back: 'id_back_ravi.jpg'
    },
    profilePhoto: 'ravi_profile.jpg'
  }
];

const BikeRiderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewRider = id === 'new';
  const [rider, setRider] = useState({
    name: '',
    mobile: '',
    email: '',
    status: 'Pending',
    age: '',
    address: '',
    city: '',
    locality: '',
    landmark: '',
    pincode: '',
    experience: '',
    documents: {
      license: '',
      insurance: ''
    },
    vehicleDetails: {
      type: 'Bike',
      regNumber: '',
      insurance: '',
      certificate: '',
      photos: []
    },
    idProofs: {
      front: '',
      back: ''
    },
    profilePhoto: ''
  });

  useEffect(() => {
    if (!isNewRider) {
      const foundRider = mockBikeRiders.find(r => r.id === parseInt(id, 10));
      if (foundRider) {
        setRider(foundRider);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Rider not found",
        });
        navigate('/bike-management/riders');
      }
    }
  }, [id, isNewRider, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setRider(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setRider(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e, field) => {
    // In a real app, this would handle file uploads
    toast({
      title: "File selected",
      description: `${e.target.files[0]?.name} selected for ${field}`,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to backend
    toast({
      title: "Success",
      description: isNewRider ? "Rider added successfully" : "Rider updated successfully",
    });
    navigate('/bike-management/riders');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{isNewRider ? 'Add New Rider' : 'Rider Details'}</h1>
        <Button
          variant="outline"
          onClick={() => navigate('/bike-management/riders')}
        >
          Back to Riders
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-32 h-32 rounded-full bg-gray-200 mb-2 flex items-center justify-center overflow-hidden">
                    {rider.profilePhoto ? (
                      <img src={rider.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">👤</span>
                    )}
                  </div>
                  <label className="btn btn-sm btn-secondary cursor-pointer">
                    Upload Photo
                    <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleFileChange(e, 'profilePhoto')} />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  className="form-control" 
                  value={rider.name} 
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input 
                  id="age" 
                  name="age" 
                  type="number" 
                  className="form-control" 
                  value={rider.age} 
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input 
                  id="mobile" 
                  name="mobile" 
                  type="tel" 
                  className="form-control" 
                  value={rider.mobile} 
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  className="form-control" 
                  value={rider.email} 
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="experience">Years of Experience</label>
                <input 
                  id="experience" 
                  name="experience" 
                  type="number" 
                  className="form-control" 
                  value={rider.experience} 
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea 
                    id="address" 
                    name="address" 
                    className="form-control" 
                    value={rider.address} 
                    onChange={handleChange}
                    rows="2"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="city">City</label>
                <input 
                  id="city" 
                  name="city" 
                  type="text" 
                  className="form-control" 
                  value={rider.city} 
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="locality">Locality</label>
                <input 
                  id="locality" 
                  name="locality" 
                  type="text" 
                  className="form-control" 
                  value={rider.locality} 
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="landmark">Landmark</label>
                <input 
                  id="landmark" 
                  name="landmark" 
                  type="text" 
                  className="form-control" 
                  value={rider.landmark} 
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="pincode">PIN Code</label>
                <input 
                  id="pincode" 
                  name="pincode" 
                  type="text" 
                  className="form-control" 
                  value={rider.pincode} 
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Details */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="regNumber">Registration Number</label>
                <input 
                  id="regNumber" 
                  name="vehicleDetails.regNumber" 
                  type="text" 
                  className="form-control" 
                  value={rider.vehicleDetails.regNumber} 
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="vehicleInsurance">Vehicle Insurance</label>
                <div className="flex">
                  <input 
                    id="vehicleInsurance" 
                    name="vehicleDetails.insurance" 
                    type="text" 
                    className="form-control flex-1" 
                    value={rider.vehicleDetails.insurance} 
                    onChange={handleChange}
                    required
                  />
                  <label className="btn btn-sm btn-secondary ml-2 cursor-pointer">
                    Upload
                    <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleFileChange(e, 'vehicleInsurance')} />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="regCertificate">Registration Certificate</label>
                <div className="flex">
                  <input 
                    id="regCertificate" 
                    name="vehicleDetails.certificate" 
                    type="text" 
                    className="form-control flex-1" 
                    value={rider.vehicleDetails.certificate} 
                    onChange={handleChange}
                    required
                  />
                  <label className="btn btn-sm btn-secondary ml-2 cursor-pointer">
                    Upload
                    <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleFileChange(e, 'regCertificate')} />
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2">Vehicle Photos</label>
                <div className="flex flex-wrap gap-2">
                  {rider.vehicleDetails.photos && rider.vehicleDetails.photos.map((photo, idx) => (
                    <div key={idx} className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                      <img src={photo} alt={`Vehicle ${idx+1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <span className="text-3xl">+</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'vehiclePhoto')} />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ID Proofs */}
          <Card>
            <CardHeader>
              <CardTitle>ID Proofs</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="idFront">ID Card Front</label>
                <div className="flex">
                  <input 
                    id="idFront" 
                    type="text" 
                    className="form-control flex-1" 
                    value={rider.idProofs.front || ''} 
                    readOnly
                  />
                  <label className="btn btn-sm btn-secondary ml-2 cursor-pointer">
                    Upload
                    <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleFileChange(e, 'idFront')} />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="idBack">ID Card Back</label>
                <div className="flex">
                  <input 
                    id="idBack" 
                    type="text" 
                    className="form-control flex-1" 
                    value={rider.idProofs.back || ''} 
                    readOnly
                  />
                  <label className="btn btn-sm btn-secondary ml-2 cursor-pointer">
                    Upload
                    <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleFileChange(e, 'idBack')} />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="driverLicense">Driving License</label>
                <div className="flex">
                  <input 
                    id="driverLicense" 
                    name="documents.license" 
                    type="text" 
                    className="form-control flex-1" 
                    value={rider.documents.license} 
                    onChange={handleChange}
                    required
                  />
                  <label className="btn btn-sm btn-secondary ml-2 cursor-pointer">
                    Upload
                    <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleFileChange(e, 'license')} />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="form-group">
                <label htmlFor="status">Account Status</label>
                <select
                  id="status"
                  name="status"
                  className="form-select"
                  value={rider.status}
                  onChange={handleChange}
                >
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => navigate('/bike-management/riders')}>
              Cancel
            </Button>
            <Button type="submit">
              {isNewRider ? 'Create Rider' : 'Update Rider'}
            </Button>
          </CardFooter>
        </div>
      </form>
    </div>
  );
};

export default BikeRiderDetails;
