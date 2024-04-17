import { useEffect, useState } from 'react';
import {
  createNewAppointment,
  deleteAppointmentById,
  getAppointmentById,
  getAppointments,
} from '../services/appointment';

export const useGetAllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup logic here
    };
  }, []);

  return { appointments, loading, error };
};

export const useGetAppointmentById = (id) => {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAppointmentById(id);
        setAppointment(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup logic here
    };
  }, [id]);

  return { appointment, loading, error };
};

export const useCreateNewAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAppointment = async (data) => {
    setLoading(true);
    try {
      await createNewAppointment(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { createAppointment, loading, error };
};

export const useDeleteAppointmentById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteAppointment = async (id) => {
    setLoading(true);
    try {
      await deleteAppointmentById(id);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteAppointment, loading, error };
};
