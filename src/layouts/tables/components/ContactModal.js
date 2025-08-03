import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const ContactModal = ({ isOpen, onClose, onSave, contactData, setContactData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <MDBox
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <MDTypography variant="h6">{contactData.id ? "Modifica Contatto" : "Aggiungi Contatto"}</MDTypography>
        <TextField
          name="nome"
          label="Nome"
          value={contactData.nome}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="cognome"
          label="Cognome"
          value={contactData.cognome}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="telefono"
          label="Telefono"
          value={contactData.telefono}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={contactData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="indirizzo"
          label="Indirizzo"
          value={contactData.indirizzo}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button onClick={onSave} color="primary" variant="contained">
          Salva
        </Button>
      </MDBox>
    </Modal>
  );
};

export default ContactModal;
