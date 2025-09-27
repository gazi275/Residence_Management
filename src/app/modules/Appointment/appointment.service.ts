import { Appointment } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import ApiError from "../../error/ApiErrors"

const createAppointment = async (payload: Appointment & { userId: string }) => {
  const appointment = await prisma.appointment.create({
    data: payload,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        }
      },
      concernPeople: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true
        }
      }
    }
  });
  return appointment;
};

const getAllAppointments = async (query: any, userId: string) => {
  const { page = 1, limit = 10 } = query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  // Filter appointments where the logged-in user is either the creator or the concerned person
  const whereConditions: any = {
    OR: [
      { userId: userId },           // User created the appointment
      { concernPeopleId: userId }   // User is the concerned person
    ]
  };

  const totalCount = await prisma.appointment.count({
    where: whereConditions,
  });

  const appointments = await prisma.appointment.findMany({
    where: whereConditions,
    skip,
    take,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        }
      },
      concernPeople: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      totalCount,
      totalPages: Math.ceil(totalCount / Number(limit)),
    },
    data: appointments,
  };
};

const getSingleAppointment = async (id: string, userId: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        }
      },
      concernPeople: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true
        }
      }
    }
  });

  if (!appointment) {
    throw new ApiError(400, "Appointment not found");
  }

  // Check if the logged-in user has permission to view this appointment
  if (appointment.userId !== userId && appointment.concernPeopleId !== userId) {
    throw new ApiError(403, "You don't have permission to view this appointment");
  }

  return appointment;
};

const updateAppointment = async (id: string, payload: Partial<Appointment>, userId: string, userRole: string) => {
  const existingAppointment = await prisma.appointment.findUnique({
    where: { id }
  });

  if (!existingAppointment) {
    throw new ApiError(400, "Appointment not found");
  }

  // Only concerned person or admin/super_admin can update
  if (existingAppointment.concernPeopleId !== userId && !['ADMIN', 'SUPER_ADMIN'].includes(userRole)) {
    throw new ApiError(403, "Only the concerned person or admin can update this appointment");
  }

  const appointment = await prisma.appointment.update({
    where: {
      id,
    },
    data: payload,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        }
      },
      concernPeople: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true
        }
      }
    }
  });

  return appointment;
};

const deleteAppointment = async (id: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id,
    },
  });

  if (!appointment) {
    throw new ApiError(400, "Appointment not found");
  }

  await prisma.appointment.delete({
    where: {
      id,
    },
  });

  return appointment;
};

export const AppointmentServices = {
  createAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
};