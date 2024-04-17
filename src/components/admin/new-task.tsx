import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { z } from "zod";
import { DifficultyType } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Typography } from "../ui/typography";

import React from "react";

const projects = [
  { id: 1, name: "Project A" },
  { id: 2, name: "Project B" },
  { id: 3, name: "Project C" },
];

// Zod schema based on Task model
const taskFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  difficulty: z.nativeEnum(DifficultyType),
  about: z.string().min(20, "About must be at least 20 characters"),
  instructions: z
    .string()
    .min(20, "Instructions must be at least 20 characters"),
  projectId: z.number(),
});

export const NewTaskForm = () => {
  const form = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      name: "",
      difficulty: DifficultyType.EASY,
      about: "",
      instructions: "",
      projectId: projects[0]?.id || 1,
    },
  });

  const onSubmit = (values: z.infer<typeof taskFormSchema>) => {
    console.log(values);

    // TODO: Add logic to submit the form data to the backend
  };

  function setFormValue<T>(field: keyof typeof taskFormSchema.shape, value: T) {
    form.setValue(field, value as any);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-8 w-9/12 space-y-6"
      >
        <FormLabel>
          {" "}
          <Typography variant={"h2"}>New Task</Typography>
          <Typography variant={"smallTitle"}>
            Select project from the dropdown and fill in the form to add a new
            task to the project.
          </Typography>
        </FormLabel>
        {/*  // TODO: Change this to a dropdown menu */}
        <FormItem>
          <FormLabel>Project Name</FormLabel>
          <Input {...form.register("name")} />
        </FormItem>
        <FormItem>
          <FormLabel>About</FormLabel>
          <Textarea {...form.register("about")} />
        </FormItem>
        <FormItem>
          <FormLabel>Instructions</FormLabel>
          <Textarea {...form.register("instructions")} />
        </FormItem>

        <div className="flex items-center justify-between">
          <FormItem className="flex flex-col">
            <FormLabel>Difficulty</FormLabel>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                  {form.watch("difficulty") || "Select Difficulty"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.values(DifficultyType).map((value) => (
                  <DropdownMenuItem
                    key={value}
                    onSelect={() => setFormValue("difficulty", value)}
                  >
                    {value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </FormItem>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
