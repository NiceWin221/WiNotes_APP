const BASE_URL = import.meta.env.VITE_API_URL;

export const register = async ({ name, email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to register new user", error);
    throw error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to authenticate user", error);
    throw error;
  }
};

export const logout = async ({ id, token }) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to logout");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to authenticate user", error);
    throw error;
  }
};

export const getNotes = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch all notes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching notes", error);
    throw error;
  }
};

export const getNote = async ({ token, id }) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch note");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching notes", error);
    throw error;
  }
};

export const getArchivedNotes = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/archived`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get archived note");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching archived notes", error.message);
  }
};

export const postArchiveNote = async ({ id, token }) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to archive note");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to authenticate user", error);
    throw error;
  }
};

export const postUnArchiveNote = async ({ id, token }) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to unarchive note");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to authenticate user", error);
    throw error;
  }
};

export const deleteNote = async ({ id, token }) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete note");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to authenticate user", error);
    throw error;
  }
};

export const postNote = async ({ token, title, body }) => {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add note");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to authenticate user", error);
    throw error;
  }
};
