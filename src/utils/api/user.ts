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
