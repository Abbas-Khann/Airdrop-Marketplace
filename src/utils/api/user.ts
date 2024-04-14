import { DifficultyType } from "@prisma/client";

export type FavouriteProjectType = {
  userId: number;
  projectId: number;
};

export type CompleteTaskType = {
  userId: number;
  taskId: number;
};

export async function favouriteProject(data: FavouriteProjectType) {
  let response;
  let error;

  try {
    response = await fetch("/api/user/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    return response;
  } catch (e) {
    console.log(e);
    error = e;
    return error;
  }
}

export async function completeTask(data: CompleteTaskType) {
  let response;
  let error;

  try {
    response = await fetch("/api/user/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    return response;
  } catch (e) {
    console.log(e);
    error = e;
    return error;
  }
}

export async function getUser({ address }: { address: string }) {
  try {
    const response = await fetch(
      `/api/user/getData?ethereumAddress=${address}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const data = await response.json();

    return {
      user: data.user,
      response,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}
