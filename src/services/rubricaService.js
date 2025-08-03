const getAuthToken = () => localStorage.getItem("token");

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Qualcosa è andato storto");
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  return {};
};

export const getRubricaData = async (page, pageSize, sort) => {
  const token = getAuthToken();
  const response = await fetch(
    `/api/rubrica?page=${page}&pageSize=${pageSize}&sortBy=${sort.by}&order=${sort.order}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return handleResponse(response);
};

export const saveRubricaContact = async (contactData, editingContact) => {
  const token = getAuthToken();
  const method = editingContact ? "PUT" : "POST";
  const url = editingContact
    ? `/api/rubrica/${editingContact.id}`
    : "/api/rubrica";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(contactData),
  });
  return handleResponse(response);
};

export const deleteRubricaContact = async (contactId) => {
  const token = getAuthToken();
  const response = await fetch(`/api/rubrica/${contactId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};
