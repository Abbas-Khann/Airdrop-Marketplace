import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { z } from "zod";
import { DifficultyType, CategoryType, LikelihoodType } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRef } from "react";
import { storeFile } from "../../../firebase/methods";
import { Typography } from "../ui/typography";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  shortDescription: z.string().min(10).max(100),
  about: z.string().min(20),
  moreDescription: z.string().optional(),
  difficulty: z.nativeEnum(DifficultyType),
  category: z.nativeEnum(CategoryType),
  likelihood: z.nativeEnum(LikelihoodType),
  rating: z.number().min(0).max(5),
  featured: z.boolean(),
  network: z.array(z.number()),
  mainImage: z.string(),
  bannerImage: z.string(),
});

export const NewProjectForm = () => {
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    // TODO: Add logic to submit the form data to the backend
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      about: "",
      moreDescription: "",
      difficulty: DifficultyType.EASY,
      category: CategoryType.L1,
      likelihood: LikelihoodType.LOW,
      rating: 5,
      featured: false,
      network: [],
      mainImage: "",
      bannerImage: "",
    },
  });

  function setFormValue<T>(field: keyof typeof formSchema.shape, value: T) {
    form.setValue(field, value as any);
  }

  const mainImageRef = useRef<HTMLInputElement>(null);
  const bannerImageRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (
    fileList: FileList,
    imageType: "mainImage" | "bannerImage",
  ) => {
    const file = fileList[0];
    if (!file) return;

    const uploadedImageUrl = await storeFile(file);
    if (uploadedImageUrl) {
      form.setValue(imageType, uploadedImageUrl, { shouldValidate: true });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-8 w-9/12 space-y-6"
      >
        <FormLabel>
          {" "}
          <Typography variant={"h2"}>New Project</Typography>
          <Typography variant={"smallTitle"}>
            Fill in the form to add a new project to the database.
          </Typography>
        </FormLabel>
        <FormItem>
          <FormLabel>Project Name</FormLabel>
          <Input {...form.register("name")} />
        </FormItem>
        <FormItem>
          <FormLabel>Short Description</FormLabel>
          <Input {...form.register("shortDescription")} />
        </FormItem>
        <FormItem>
          <FormLabel>About</FormLabel>
          <Textarea {...form.register("about")} />
        </FormItem>
        <FormItem>
          <FormLabel>More Description</FormLabel>
          <Textarea {...form.register("moreDescription")} />
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
          <FormItem className="flex flex-col">
            <FormLabel>Category</FormLabel>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                  {form.watch("category") || "Select Category"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.values(CategoryType).map((value) => (
                  <DropdownMenuItem
                    key={value}
                    onSelect={() => setFormValue("category", value)}
                  >
                    {value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </FormItem>
          <FormItem className="flex flex-col">
            <FormLabel>Likelihood</FormLabel>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                  {form.watch("likelihood") || "Select Likelihood"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.values(LikelihoodType).map((value) => (
                  <DropdownMenuItem
                    key={value}
                    onSelect={() => setFormValue("likelihood", value)}
                  >
                    {value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </FormItem>
        </div>

        <FormItem>
          <FormLabel>Rating</FormLabel>
          <Input
            type="number"
            {...form.register("rating", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
          />
        </FormItem>
        <FormItem className="flex items-center justify-start gap-4 p-0">
          <FormLabel>Featured </FormLabel>
          <Checkbox className="m-0 p-0" {...form.register("featured")} />
        </FormItem>
        <FormItem>
          <FormLabel>Network IDs (comma-separated)</FormLabel>
          <Input
            {...form.register("network", {
              setValueAs: (value) => {
                if (typeof value === "string") {
                  return value
                    .split(",")
                    .map(Number)
                    .filter((n) => !isNaN(n));
                }
                return [];
              },
            })}
          />
        </FormItem>

        <FormItem>
          <FormLabel>Main Image (Project Logo)</FormLabel>
          <Input
            type="file"
            ref={mainImageRef}
            onChange={() => {
              if (mainImageRef.current?.files) {
                handleImageUpload(mainImageRef.current.files, "mainImage");
              }
            }}
          />
        </FormItem>
        <FormItem>
          <FormLabel>Banner Image (Project Banner)</FormLabel>
          <Input
            type="file"
            ref={bannerImageRef}
            onChange={() => {
              if (bannerImageRef.current?.files) {
                handleImageUpload(bannerImageRef.current.files, "bannerImage");
              }
            }}
          />
        </FormItem>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
