import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormItem, FormLabel, FormField } from "@/components/ui/form";
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

const tasks = [
  { id: 1, name: "Task A" },
  { id: 2, name: "Task B" },
  { id: 3, name: "Task C" },
];

const projects = [
  { id: 1, name: "Project A" },
  { id: 2, name: "Project B" },
  { id: 3, name: "Project C" },
];

const stepFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  taskId: z.number(),
});

export const NewStepForm = () => {
  const form = useForm({
    resolver: zodResolver(stepFormSchema),
    defaultValues: {
      name: "",
      description: "",
      taskId: tasks[0]?.id || 1,
    },
  });

  const onSubmit = (values: z.infer<typeof stepFormSchema>) => {
    console.log(values);

    // TODO: Add logic to submit the form data to the backend
  };

  function setFormValue<T>(field: keyof typeof stepFormSchema.shape, value: T) {
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
          <Typography variant={"h2"}>New Step</Typography>
          <Typography variant={"smallTitle"}>
            Select task from the dropdown and fill in the form to add a new step
            to the task.
          </Typography>
        </FormLabel>
        <FormItem className="flex flex-col">
          <FormLabel>Project ID</FormLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                {form.watch("taskId") || "Select Difficulty"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.values(projects).map(({ id, name }) => (
                <DropdownMenuItem
                  key={String(id)}
                  onSelect={() => setFormValue("taskId", id)}
                >
                  {name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </FormItem>
        <FormItem className="flex flex-col">
          <FormLabel>Task ID</FormLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                {form.watch("taskId") || "Select Difficulty"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.values(tasks).map(({ id, name }) => (
                <DropdownMenuItem
                  key={String(id)}
                  onSelect={() => setFormValue("taskId", id)}
                >
                  {name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </FormItem>
        <FormItem>
          <FormLabel>Step Name</FormLabel>
          <Input {...form.register("name")} />
        </FormItem>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Textarea {...form.register("description")} />
            </FormItem>
          )}
        />
        {/* <FormItem>
          <FormLabel>Description</FormLabel>
          <Textarea {...form.register("description")} />
          {errors.description && <p>{errors.description.message}</p>}
        </FormItem> */}

        <Button type="submit">Submit Step</Button>
      </form>
    </Form>
  );
};
