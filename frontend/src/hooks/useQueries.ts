import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { NumerologyReport, VastuRemedy, ConsultationBooking, AvailableSlot } from '../backend';

export function useGenerateNumerologyReport() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userName, birthDate }: { userName: string; birthDate: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.generateNumerologyReport(userName, birthDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['numerologyReports'] });
    },
  });
}

export function useGenerateVastuRemedies() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userName, numerologyNumber }: { userName: string; numerologyNumber: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getVastuRemedies(userName, numerologyNumber);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vastuRemedies'] });
    },
  });
}

export function useBookConsultation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userName,
      contactNumber,
      selectedTimeSlot,
    }: {
      userName: string;
      contactNumber: string;
      selectedTimeSlot: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.bookConsultation(userName, contactNumber, selectedTimeSlot);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['availableSlots'] });
    },
  });
}

export function useAvailableTimeSlots() {
  const { actor, isFetching } = useActor();

  return useQuery<AvailableSlot[]>({
    queryKey: ['availableSlots'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAvailableTimeSlots();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<ConsultationBooking[]>({
    queryKey: ['bookings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllNumerologyReports() {
  const { actor, isFetching } = useActor();

  return useQuery<NumerologyReport[]>({
    queryKey: ['numerologyReports'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNumerologyReports();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllVastuRemedies() {
  const { actor, isFetching } = useActor();

  return useQuery<VastuRemedy[]>({
    queryKey: ['vastuRemedies'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVastuRemedies();
    },
    enabled: !!actor && !isFetching,
  });
}
