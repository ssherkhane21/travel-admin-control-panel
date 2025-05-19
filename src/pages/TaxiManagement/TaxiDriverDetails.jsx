import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from "@/hooks/use-toast";

const mockTaxiDrivers = [
  { 
    id: 1, 
    name: 'Rahul Sharma', 
    mobile: '9876543210', 
    email: 'rahul@taxidriver.com', 
    status: 'Approved',
    age: 32,
    address: '123 Main Road, Mumbai',
    experience: 5,
    city: 'Mumbai',
    locality: 'Andheri',
    landmark: 'Near City Mall',
    pincode: '400053',
    documents: {
      license: 'DL-123456789',
      insurance: 'INS-987654321'
    },
    vehicleDetails: {
      type: 'Car',
      regNumber: 'MH02AB1234',
      insurance: 'INSU123456',
      certificate: 'RC123456789',
      photos: ['car1.jpg', 'car2.jpg']
    },
    idProofs: {
      front: 'id_front.jpg',
      back: 'id_back.jpg'
    },
    profilePhoto: 'rahul_profile.jpg'
  },
  { 
    id: 2, 
    name: 'Priya Singh', 
    mobile: '9876543211', 
    email: 'priya@taxidriver.com', 
    status: 'Pending',
    age: 28,
    address: '456 Park Avenue, Delhi',
    city: 'Delhi',
    locality: 'Connaught Place',
    landmark: 'Near Central Park',
    pincode: '110001',
    experience: 3,
    documents: {
      license: 'DL-234567890',
      insurance: 'INS-876543219'
    },
    vehicleDetails: {
      type: 'Car',
      regNumber: 'DL05CD5678',
      insurance: 'INSU234567',
      certificate: 'RC234567890',
      photos: ['car3.jpg', 'car4.jpg']
    },
    idProofs: {
      front: 'id_front_priya.jpg',
      back: 'id_back_priya.jpg'
    },
    profilePhoto: 'priya_profile.jpg'
  },
  { 
    id: 3, 
    name: 'Amit Kumar', 
    mobile: '9876543212', 
    email: 'amit@taxidriver.com', 
    status: 'Rejected',
    age: 35,
    address: '789 Lake Road, Bangalore',
    city: 'Bangalore',
    locality: 'Indiranagar',
    landmark: 'Near Ulsoor Lake',
    pincode: '560038',
    experience: 8,
    documents: {
      license: 'DL-345678901',
      insurance: 'INS-765432198'
    },
    vehicleDetails: {
      type: 'Car',
      regNumber: 'KA09EF9012',
      insurance: 'INSU345678',
      certificate: 'RC345678901',
      photos: ['car5.jpg', 'car6.jpg']
    },
    idProofs: {
      front: 'id_front_amit.jpg',
      back: 'id_back_amit.jpg'
    },
    profilePhoto: 'amit_profile.jpg'
  },
  { 
    id: 4, 
    name: 'Deepika Patel', 
    mobile: '9876543213', 
    email: 'deepika@taxidriver.com', 
    status: 'Approved',
    age: 30,
    address: '234 Hill View, Chennai',
    city: 'Chennai',
    locality: 'Adyar',
    landmark: 'Near Elliot Beach',
    pincode: '600020',
    experience: 4,
    documents: {
      license: 'DL-456789012',
      insurance: 'INS-654321987'
    },
    vehicleDetails: {
      type: 'Car',
      regNumber: 'TN04GH3456',
      insurance: 'INSU456789',
      certificate: 'RC456789012',
      photos: ['car7.jpg', 'car8.jpg']
    },
    idProofs: {
      front: 'id_front_deepika.jpg',
      back: 'id_back_deepika.jpg'
    },
    profilePhoto: 'deepika_profile.jpg'
  },
  { 
    id: 5, 
    name: 'Vikram Singh', 
    mobile: '9876543214', 
    email: 'vikram@taxidriver.com', 
    status: 'Pending',
    age: 38,
    address: '567 River Side, Kolkata',
    city: 'Kolkata',
    locality: 'Park Street',
    landmark: 'Near Victoria Memorial',
    pincode: '700016',
    experience: 10,
    documents: {
      license: 'DL-567890123',
      insurance: 'INS-543219876'
    },
    vehicleDetails: {
      type: 'Car',
      regNumber: 'WB02IJ7890',
      insurance: 'INSU567890',
      certificate: 'RC567890123',
      photos: ['car9.jpg', 'car10.jpg']
    },
    idProofs: {
      front: 'id_front_vikram.jpg',
      back: 'id_back_vikram.jpg'
    },
    profilePhoto: 'vikram_profile.jpg'
  },
];

const TaxiDriverDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewDriver = id === 'new';
  const [driver, setDriver] = useState({
    name: '',
    mobile: '',
    email: '',
    status: 'Pending',
    age: '',
    address: '',
    experience: '',
    city: '',
    locality: '',
    landmark: '',
    pincode: '',
    documents: {
      license: '',
      insurance: ''
    },
    vehicleDetails: {
      type: 'Car',
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
    if (!isNewDriver) {
      const foundDriver = mockTaxiDrivers.find(d => d.id === parseInt(id, 10));
      if (foundDriver) {
        setDriver(foundDriver);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Driver not found",
        });
        navigate('/taxi-management/drivers');
      }
    }
  }, [id, isNewDriver, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setDriver(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setDriver(prev => ({
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
      description: isNewDriver ? "Driver added successfully" : "Driver updated successfully",
    });
    navigate('/taxi-management/drivers');
  };

  const statusOptions = ['Approved', 'Pending', 'Rejected'];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{isNewDriver ? 'Add New Driver' : 'Driver Details'}</h1>
        <Button
          variant="outline"
          onClick={() => navigate('/taxi-management/drivers')}
        >
          Back to Drivers
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
                    {driver.profilePhoto ? (
                      <img src={driver.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
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
                  value={driver.name} 
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
                  value={driver.age} 
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
                  value={driver.mobile} 
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
                  value={driver.email} 
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
                  value={driver.experience} 
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
                    value={driver.address} 
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
                  value={driver.city} 
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
                  value={driver.locality} 
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
                  value={driver.landmark} 
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
                  value={driver.pincode} 
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
                <label htmlFor="vehicleType">Vehicle Type</label>
                <select
                  id="vehicleType"
                  name="vehicleDetails.type"
                  className="form-select"
                  value={driver.vehicleDetails.type}
                  onChange={handleChange}
                >
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="regNumber">Registration Number</label>
                <input 
                  id="regNumber" 
                  name="vehicleDetails.regNumber" 
                  type="text" 
                  className="form-control" 
                  value={driver.vehicleDetails.regNumber} 
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
                    value={driver.vehicleDetails.insurance} 
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
                    value={driver.vehicleDetails.certificate} 
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
                  {driver.vehicleDetails.photos && driver.vehicleDetails.photos.map((photo, idx) => (
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
                    value={driver.idProofs.front || ''} 
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
                    value={driver.idProofs.back || ''} 
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
                    value={driver.documents.license} 
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
                  value={driver.status}
                  onChange={handleChange}
                >
                  {statusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => navigate('/taxi-management/drivers')}>
              Cancel
            </Button>
            <Button type="submit">
              {isNewDriver ? 'Create Driver' : 'Update Driver'}
            </Button>
          </CardFooter>
        </div>
      </form>
    </div>
  );
};

export default TaxiDriverDetails;
