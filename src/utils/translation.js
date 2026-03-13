import { Syringe, Stethoscope, Bandage } from 'lucide-react-native';

export const speciesMap = {
  DOG: "PERRO",
  CAT: "GATO",
};

export const appointmentTypeMap = {
  CONSULTATION: "CONSULTA",
  VACCINATION: "VACUNACIÓN",
  CONTROL: "CONTROL",
  SURGERY: "CIRUGÍA"
};

export const appointmentIconMap = {
  VACCINATION: Syringe,
  CONSULTATION: Stethoscope,
  CONTROL: Stethoscope,
  SURGERY: Bandage
};

export const statusMap = {
  SCHEDULED: "PROGRAMADO",
  COMPLETED: "COMPLETADO",
  CANCELLED: "CANCELADO",
};

export const rolesMap = {
  OWNER: "Dueño",
  VET: "Veterinario",
  SECRETARY: "Secretaría",
  ADMIN: "Administrador",
};

export const specialtyMap = {
  GENERAL: "General",
  SURGERY: "Cirugía",
  DERMATOLOGY: "Dematología",
  CARDIOLOGY: "Cardiología",
  ONCOLOGY: "Oncología",
};