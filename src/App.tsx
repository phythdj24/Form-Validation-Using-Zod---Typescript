import React from "react";
import { ZodType, z } from "zod";

import "./App.css";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};
function App() {
  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email(),
      password: z.string().min(8).max(20),
      age: z.number().min(18).max(70),
      confirmPassword: z.string().min(8).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password Do Not Match",
      path: ["confirmPassword"],
    });

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({resolver:zodResolver(schema)})
    const submitData = (data: FormData)=>{
      console.log("It Work", data);
      
    }
  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitData)}>
        <label htmlFor="">First Name</label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <label htmlFor="">Last Name</label>
        <input type="text" {...register("lastName")} />
        <label htmlFor="">email:</label>
        <input type="email" {...register("email")} />
        <label htmlFor="">age</label>
        <input type="number" {...register("age", {valueAsNumber: true})} />
        <label htmlFor="">Password</label>
        <input type="password" {...register("password")} />
        <label htmlFor="">Confirm Password</label>
        <input type="password" {...register("confirmPassword")} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
