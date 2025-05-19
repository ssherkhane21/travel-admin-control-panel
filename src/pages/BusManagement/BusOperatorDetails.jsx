
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

const BusOperatorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    profilePhoto: null,
    name: '',
    mobile: '',
    email: '',
    address: '',
    identityCard: '',
    businessLicense: '',
    bankAccountNumber: '',
    bankAccountDetails: null,
    idCardFront: null,
    idCardBack: null,
    bankName: '',
    accountHolderName: '',
  });

  // Mock function to fetch operator details - in a real app, this would be an API call
  useEffect(() => {
    // Simulating API fetch
    const fetchOperatorDetails = () => {
      // Using the mockBusOperators data from the BusOperators component
      const mockOperator = {
        id: parseInt(id),
        name: 'Sharma Travels',
        mobile: '9876543210',
        email: 'sharma@travels.com',
        address: '123 Bus Terminal, Delhi',
        identityCard: 'ABCDE1234F',
        businessLicense: 'LIC-12345-BUS',
        bankAccountNumber: '1234567890',
        bankName: 'State Bank of India',
        accountHolderName: 'Sharma Travels Ltd',
        status: 'Approved',
        buses: 12
      };

      setFormData({
        ...formData,
        name: mockOperator.name,
        mobile: mockOperator.mobile,
        email: mockOperator.email,
        address: mockOperator.address,
        identityCard: mockOperator.identityCard,
        businessLicense: mockOperator.businessLicense,
        bankAccountNumber: mockOperator.bankAccountNumber,
        bankName: mockOperator.bankName,
        accountHolderName: mockOperator.accountHolderName,
      });
    };

    fetchOperatorDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real app, you would make an API call here
    setIsEditing(false);
    // Show success message
    alert('Bus operator details updated successfully!');
  };

  const handleBackClick = () => {
    navigate('/bus-management/operators');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={handleBackClick}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Bus Operator Details</h1>
        <div className="ml-auto">
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "destructive" : "outline"}
          >
            {isEditing ? 'Cancel' : 'Edit Details'}
          </Button>
          {isEditing && (
            <Button 
              onClick={handleSubmit}
              className="ml-2"
            >
              Save Changes
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operator Information - ID: {id}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Profile Photo */}
              <div className="space-y-2">
                <Label htmlFor="profilePhoto">Profile Photo (PNG, JPG, PDF)</Label>
                <div className="flex items-end gap-4">
                  {formData.profilePhoto ? (
                    <div className="relative h-24 w-24 rounded-md overflow-hidden border">
                      <img 
                        src={URL.createObjectURL(formData.profilePhoto)} 
                        alt="Profile preview" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-md border border-dashed flex items-center justify-center bg-muted">
                      <span className="text-xs text-muted-foreground">No photo</span>
                    </div>
                  )}
                  <Input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={handleFileChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email ID</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>

              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  rows={3}
                />
              </div>

              {/* Identity Documents */}
              <div className="space-y-2">
                <Label htmlFor="identityCard">Identity Card</Label>
                <Input
                  id="identityCard"
                  name="identityCard"
                  value={formData.identityCard}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessLicense">Business License</Label>
                <Input
                  id="businessLicense"
                  name="businessLicense"
                  value={formData.businessLicense}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>

              {/* ID Card Front */}
              <div className="space-y-2">
                <Label htmlFor="idCardFront">ID Card Front (PNG, JPG, PDF)</Label>
                <div className="flex items-end gap-4">
                  {formData.idCardFront ? (
                    <div className="relative h-24 w-24 rounded-md overflow-hidden border">
                      <img 
                        src={URL.createObjectURL(formData.idCardFront)} 
                        alt="ID Card Front preview" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-md border border-dashed flex items-center justify-center bg-muted">
                      <span className="text-xs text-muted-foreground">No document</span>
                    </div>
                  )}
                  <Input
                    id="idCardFront"
                    name="idCardFront"
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={handleFileChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* ID Card Back */}
              <div className="space-y-2">
                <Label htmlFor="idCardBack">ID Card Back (PNG, JPG, PDF)</Label>
                <div className="flex items-end gap-4">
                  {formData.idCardBack ? (
                    <div className="relative h-24 w-24 rounded-md overflow-hidden border">
                      <img 
                        src={URL.createObjectURL(formData.idCardBack)} 
                        alt="ID Card Back preview" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-md border border-dashed flex items-center justify-center bg-muted">
                      <span className="text-xs text-muted-foreground">No document</span>
                    </div>
                  )}
                  <Input
                    id="idCardBack"
                    name="idCardBack"
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={handleFileChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Bank Details */}
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAccountNumber">Bank Account Number</Label>
                <Input
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountHolderName">Account Holder Name</Label>
                <Input
                  id="accountHolderName"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>

              {/* Bank Account Details Document */}
              <div className="space-y-2">
                <Label htmlFor="bankAccountDetails">Bank Account Details (PNG, JPG, PDF)</Label>
                <div className="flex items-end gap-4">
                  {formData.bankAccountDetails ? (
                    <div className="relative h-24 w-24 rounded-md overflow-hidden border">
                      <img 
                        src={URL.createObjectURL(formData.bankAccountDetails)} 
                        alt="Bank Account Details preview" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-md border border-dashed flex items-center justify-center bg-muted">
                      <span className="text-xs text-muted-foreground">No document</span>
                    </div>
                  )}
                  <Input
                    id="bankAccountDetails"
                    name="bankAccountDetails"
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={handleFileChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusOperatorDetails;
