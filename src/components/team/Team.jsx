import React from "react";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

// Importando as imagens dos membros da equipe
import claudioImage from "../../assets/claudio.jpg";
import luizImage from "../../assets/luiz.jpg";
import jhefImage from "../../assets/jhef.jpg";
import gabrielImage from "../../assets/gabriel.png";
import marcosImage from "../../assets/marcos.jpg";

// Estilos personalizados para o CardHeader
const customCardHeaderStyles = {
  backgroundColor: "transparent", // Remove o fundo branco
  borderRadius: "0.75rem", // Bordas arredondadas
};

// Dados dos membros da equipe
const teamMembers = [
  {
    name: "Claudio Marinho",
    role: "Presidente - CEO",
    email: "claudioplanno@gmail.com",
    image: claudioImage,
  },
  {
    name: "Luiz Guilherme Filho",
    role: "Gerente de Tecnologia e Programação",
    email: "devguiga@outlook.com",
    image: luizImage,
  },
  {
    name: "Jheferson Ullrich",
    role: "Gerente de Rotas",
    email: "jheff_ullrich@outlook.com",
    image: jhefImage,
  },
  {
    name: "Gabriel Couter",
    role: "Instrutor B38M, B736 e B738",
    email: "gabrielcouter@outlook.com",
    image: gabrielImage,
  },
  {
    name: "Marcos Ortencio",
    role: "Designer",
    email: "marcos.ortencio@gmail.com",
    image: marcosImage,
  },
];

export function Team() {
  return (
    <div id="staff-section" className="flex justify-center flex-wrap">
      <h2 className="w-full text-center text-3xl font-bold text-gray-900 dark:text-white p-5 mt-[-10px]">
        Staffs
      </h2>
      {teamMembers.map((member, index) => (
        <Card
          key={index}
          className="w-80 rounded-xl m-4 shadow-lg bg-[#F3F4F6] dark:bg-[#353E4B]" // Fundo claro no tema padrão e escuro no tema dark
        >
          <CardHeader
            floated={false}
            className="h-64 flex justify-center items-center"
            style={customCardHeaderStyles}
          >
            <img
              src={member.image}
              alt="profile-picture"
              className="rounded-full w-32 h-32 object-cover"
            />
          </CardHeader>
          <CardBody className="text-center">
            <Typography
              variant="h4"
              style={{ color: "#FF5A1F" }}
              className="mb-2"
            >
              {member.name}
            </Typography>
            <Typography
              className="font-medium mb-1 text-gray-900 dark:text-gray-300" // Texto preto no claro e cinza claro no escuro
              style={{ fontSize: "0.875rem" }}
            >
              {member.role}
            </Typography>
            <Typography
              className="font-medium text-gray-900 dark:text-gray-300" // Texto preto no claro e cinza claro no escuro
              style={{ fontSize: "0.875rem" }}
            >
              {member.email}
            </Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default Team;
