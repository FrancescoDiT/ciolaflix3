'use client'

import React, {useState} from 'react';
import {z} from "zod";
import {schemas, zodClient} from "@/api/client";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {useUser} from "@/context/UserContext";
import {useParams, useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";
import {isErrorFromAlias} from "@zodios/core";
import GlassSurface from "@/components/GlassSurface";
import {motion} from "framer-motion";
import Link from "next/link";
import {Lock, LogIn, Mail} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {Button} from "@/components/ui/button";


type FormData = z.infer<typeof schemas.LoginRequestDTO>


function LoginForm() {

    const [serverError, setServerError] = useState<string | null>(null)
    const {setUser} = useUser();
    const params = useSearchParams();
    const callbackUrl = params.get("callbackUrl")
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        control
    } = useForm<FormData>({
        resolver: zodResolver(schemas.LoginRequestDTO),
        mode: "onBlur"
    });

    const onSubmit = async (data: FormData) => {
        setServerError(null);

        console.log("ciuao")

        try {
            const response = await zodClient.login({
                ...data,
            });

            const user: any = JSON.parse(response.userJson!);

            setUser({
                subject: user.sub,
                roles: user.roles,
                firstName: user.first_name,
                lastName: user.last_name,
            })

            if(callbackUrl) {
                router.replace(callbackUrl)
            } else {
                router.replace("/")
            }

            console.log("Login completato");

        } catch (error) {
            if (isErrorFromAlias(zodClient.api, "login", error)) {
                setServerError(error.response.data.message ?? "Errore durante il login");
            } else if (error instanceof Error) {
                setServerError(error.message || "Errore durante il login");
            } else {
                setServerError("Credenziali non valide o errore del server");
            }
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <GlassSurface
                    width="100%"
                    height="auto"
                    backgroundOpacity={0.6}
                    blur={1000}
                    borderRadius={28}
                >
                    <div className="p-8 space-y-8">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Bentornato
                            </h1>
                            <p className="text-slate-600 dark:text-slate-300">
                                Accedi al tuo account per continuare
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {serverError && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center"
                                >
                                    {serverError}
                                </motion.div>
                            )}

                            {/* Fields */}
                            <div className="space-y-4 ">
                                <div className="">
                                    {/*<div className="pl-4 flex items-center pointer-events-none ">*/}
                                    {/*    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-purple-400 transition-colors" />*/}
                                    {/*</div>*/}
                                    {/*<input*/}
                                    {/*    type={"text"}*/}
                                    {/*    {...register("subject")}*/}
                                    {/*    placeholder="Email"*/}
                                    {/*    aria-label="Email"*/}
                                    {/*    autoComplete="email"*/}
                                    {/*    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-slate-900 dark:text-white placeholder:text-slate-500"*/}
                                    {/*/>*/}
                                    {errors.subject?.message && (
                                        <p className={"text-red-400/70 text-sm mb-2"}>
                                            {errors.subject.message}
                                        </p>
                                    )}
                                    <InputGroup>
                                        <InputGroupInput
                                            id={"subject"}
                                            placeholder="Email"
                                            type={"text"}
                                            {...register("subject")}
                                            aria-label={"Email"}
                                            autoComplete={"email"}
                                            className={"w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-slate-900 dark:text-white placeholder:text-slate-500"}
                                        />
                                        <InputGroupAddon align="inline-start">
                                            <Mail className="text-muted-foreground" />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
                                    </div>
                                    <input
                                        id={"password"}
                                        type="password"
                                        placeholder="Password"
                                        aria-label="Password"
                                        autoComplete="current-password"
                                        {...register("password")}
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-slate-900 dark:text-white placeholder:text-slate-500"
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? 'Accesso in corso...' : 'Accedi'}
                            </Button>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full relative group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 group-hover:duration-200" />
                                <div className="relative flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-black rounded-xl text-white font-medium hover:bg-slate-800 dark:hover:bg-slate-900 transition-colors">
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <LogIn className="w-5 h-5" />
                                            <span>Accedi</span>
                                        </>
                                    )}
                                </div>
                            </button>
                        </form>

                        {/* Registration/Login Link */}

                        <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                            {"Non hai un account? "}
                            <Link
                                href="/signup"
                                className="inline-flex items-center gap-1 font-semibold text-purple-500 hover:text-purple-400 transition-colors"
                            >
                                Registrati
                            </Link>
                        </div>

                    </div>
                </GlassSurface>
            </div>
        </div>
    );
}

export default LoginForm;