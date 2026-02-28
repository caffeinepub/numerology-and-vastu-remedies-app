import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface VastuRemedy {
    userName: string;
    numerologyNumber: bigint;
    preferredDirections: Array<string>;
    vastuSuggestions: Array<string>;
    remedyInstructions: string;
}
export interface NumerologyReport {
    userName: string;
    birthDate: string;
    favorableColors: Array<string>;
    relationshipGuidance: string;
    lifePathNumber: bigint;
    careerRecommendations: Array<string>;
    luckyNumbers: Array<bigint>;
    birthChartAnalysis: string;
}
export interface AvailableSlot {
    isAvailable: boolean;
    slotId: bigint;
    timeRange: string;
    timestamp: bigint;
}
export interface ConsultationBooking {
    userName: string;
    bookingId: bigint;
    bookingStatus: string;
    contactNumber: string;
    selectedTimeSlot: string;
}
export interface backendInterface {
    addAvailableSlot(timeRange: string): Promise<AvailableSlot>;
    bookConsultation(userName: string, contactNumber: string, selectedTimeSlot: string): Promise<ConsultationBooking>;
    generateNumerologyReport(userName: string, birthDate: string): Promise<NumerologyReport>;
    getAllBookings(): Promise<Array<ConsultationBooking>>;
    getAllNumerologyReports(): Promise<Array<NumerologyReport>>;
    getAllVastuRemedies(): Promise<Array<VastuRemedy>>;
    getAvailableTimeSlots(): Promise<Array<AvailableSlot>>;
    getVastuRemedies(userName: string, numerologyNumber: bigint): Promise<VastuRemedy>;
}
