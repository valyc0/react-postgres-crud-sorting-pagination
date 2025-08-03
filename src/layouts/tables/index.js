import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {
  CircularProgress,
  Pagination,
  Button,
  Icon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { getRubricaData, saveRubricaContact, deleteRubricaContact } from "../../services/rubricaService";
import ContactModal from "./components/ContactModal";

function Tables() {
  const [rubricaData, setRubricaData] = useState({ columns: [], rows: [] });
  const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ by: "id", order: "asc" });
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 3;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [newContactData, setNewContactData] = useState({
    nome: "",
    cognome: "",
    telefono: "",
    email: "",
    indirizzo: "",
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    color: "info",
    message: "",
  });

  const openSnackbar = (color, message) => {
    setSnackbar({ open: true, color, message });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpenModal = (contact = null) => {
    setIsModalOpen(true);
    setEditingContact(contact);
    if (contact) {
      setNewContactData(contact);
    } else {
      setNewContactData({
        nome: "",
        cognome: "",
        telefono: "",
        email: "",
        indirizzo: "",
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const handleSave = async () => {
    try {
      await saveRubricaContact(newContactData, editingContact);
      handleCloseModal();
      fetchData();
      openSnackbar(
        "success",
        `Contatto ${editingContact ? "aggiornato" : "creato"} con successo!`
      );
    } catch (err) {
      console.error(err);
      openSnackbar("error", "Errore nel salvataggio del contatto.");
    }
  };

  const handleDelete = (id) => {
    setContactToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteRubricaContact(contactToDelete);
      fetchData();
      openSnackbar("success", "Contatto eliminato con successo!");
    } catch (err) {
      console.error(err);
      openSnackbar("error", "Errore nell'eliminazione del contatto.");
    } finally {
      setDeleteConfirmOpen(false);
      setContactToDelete(null);
    }
  };

  const handleSort = (newSortBy) => {
    setSort((prevSort) => ({
      by: newSortBy,
      order: prevSort.by === newSortBy && prevSort.order === "asc" ? "desc" : "asc",
    }));
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, total } = await getRubricaData(page, pageSize, sort);
      if (Array.isArray(data)) {
        const createSortableColumn = (accessor, width) => ({
          Header: (
            <MDBox onClick={() => handleSort(accessor)} sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
              {accessor}
              {sort.by === accessor && <Icon>{sort.order === "asc" ? "arrow_upward" : "arrow_downward"}</Icon>}
            </MDBox>
          ),
          accessor,
          width,
        });

        const columns = [
          createSortableColumn("nome", "15%"),
          createSortableColumn("cognome", "15%"),
          createSortableColumn("telefono"),
          createSortableColumn("email"),
          createSortableColumn("indirizzo"),
          { Header: "actions", accessor: "actions" },
        ];
        const rows = data.map((item) => ({
          ...item,
          actions: (
            <MDBox>
              <Button onClick={() => handleOpenModal(item)}>
                <Icon>edit</Icon>
              </Button>
              <Button onClick={() => handleDelete(item.id)}>
                <Icon>delete</Icon>
              </Button>
            </MDBox>
          ),
        }));
        setRubricaData({ columns, rows });
        setTotalPages(Math.ceil(total / pageSize));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, sort]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Rubrica
                </MDTypography>
                <Button
                  variant="contained"
                  color="white"
                  onClick={() => handleOpenModal()}
                >
                  <Icon>add</Icon>
                  &nbsp; Aggiungi Nuovo
                </Button>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <MDBox display="flex" justifyContent="center" p={5}>
                    <CircularProgress />
                  </MDBox>
                ) : (
                  <>
                    <DataTable
                      table={rubricaData}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                    <MDBox display="flex" justifyContent="center" p={2}>
                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        color="info"
                        showFirstButton
                        showLastButton
                        variant="rounded"
                      />
                    </MDBox>
                  </>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <ContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        contactData={newContactData}
        setContactData={setNewContactData}
      />
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Conferma Eliminazione</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sei sicuro di voler eliminare questo contatto? L'azione è
            irreversibile.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Annulla</Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Elimina
          </Button>
        </DialogActions>
      </Dialog>
      <MDSnackbar
        color={snackbar.color}
        icon="notifications"
        title="Notifica"
        content={snackbar.message}
        open={snackbar.open}
        onClose={closeSnackbar}
        close={closeSnackbar}
        bgWhite
      />
      <Footer />
    </DashboardLayout>
  );
}


export default Tables;

