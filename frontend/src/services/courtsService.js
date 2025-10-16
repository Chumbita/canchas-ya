const API_URL = import.meta.env.VITE_API_URL;

export async function getCourts(idSportClub) {
  const res = await fetch(`${API_URL}/courts/${idSportClub}`);
  if (!res.ok) throw new Error("Error al obtener las canchas");
  return await res.json();
}

export async function putCourt(id, updates) {
  const res = await fetch(`${API_URL}/courts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al actualizar la cancha");
  }
  const data = await res.json();
  return data.data;
}
export async function deleteCourt(id) {
  const res = await fetch(`${API_URL}/courts/${id}` , {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al eliminar la cancha");
  }
  const data = await res.json();
  return data;
}