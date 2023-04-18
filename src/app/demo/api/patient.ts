export interface Country {
    name?: string;
    code?: string;
}

export interface MedicalDetails {
    bloodGroup?: string;
    bloodPressure?: string;
    heartRate?: number;
    respiratoryRate?: number;
    temperature?: number;
    oxyGenSaturation?: string;
}

export interface Patient {
    patientId?: number;
    name?: string;
    age?: number;
    hospitalId?: number;
    contactNo?: string;
    medicalDetails?: MedicalDetails;
}

