import { prisma } from "../../configs/prisma.js";
import { BadRequest } from "../../errors/index.js";
import { CreateClientDTO } from "./client.dto.js";

export const createClientSer = async (
  data: CreateClientDTO,
): Promise<CreateClientDTO> => {
  const { name, phone, email } = data;

  const cleanPhone = phone.replace(/\D/g, ""); // Remove non-digit characters
  const existingClient = await prisma.client.findFirst({
    where: { phone: cleanPhone },
  });
  if (existingClient)
    throw BadRequest("Client with this phone number already exists");

  const newClient = await prisma.client.create({
    data: {
      name,
      phone: cleanPhone,
      email,
    },
  });

  return {
    name: newClient.name,
    phone: newClient.phone,
    email: newClient.email,
  };
};

export const updateClientSer = async (phone: string, data: Partial<CreateClientDTO>) : Promise<CreateClientDTO> =>{
    const cleanPhone = phone.replace(/\D/g, "");

    const existingClient = await prisma.client.findUnique({
        where: { phone: cleanPhone }
    });
    if(!existingClient) throw BadRequest("Client not found");

    const updatedClient = await prisma.client.update({
        where: { phone: cleanPhone },
        data: {
            ...data
        }
    });

    return {
        name: updatedClient.name,
        phone: updatedClient.phone,
        email: updatedClient.email,
    };
}