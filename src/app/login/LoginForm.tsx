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
import {ArrowRight, Lock, LogIn, Mail} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {Button} from "@/components/ui/button";
import GradientText from "@/components/GradientText";
import { X } from "lucide-react";


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
                    backgroundOpacity={0.1}
                    saturation={1}
                    borderWidth={0.2}
                    blur={11}
                    borderRadius={28}
                    brightness={50}

                >
                    <div className="p-8 space-y-6">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <GradientText
                                colors={["#ff5e1a","#e29832","#ff8f8f", "#e29832", "#ff5e1a"]}
                                animationSpeed={6}
                                showBorder={false}
                                pauseOnHover={true}
                                className="text-5xl bg-clip-text text-transparent backdrop-blur-none bg-transparent rounded-none"
                            >
                                Benvenuto
                            </GradientText>
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
                            <div className="space-y-4">
                                <div>
                                    <InputGroup
                                    className="py-6 ">
                                        <InputGroupInput
                                            id={"subject"}
                                            placeholder="Email"
                                            type={"text"}
                                            {...register("subject")}
                                            aria-label={"Email"}
                                            autoComplete={"email"}
                                            className={"px-none"}
                                        />
                                        <InputGroupAddon
                                            align="inline-start"
                                            className="pl-3">
                                            <Mail width={24} height={24} className="text-muted-foreground group-focus-within/input-group:text-brand-3 transition-colors" />
                                        </InputGroupAddon>
                                    </InputGroup>

                                    {errors.subject?.message && (
                                        <p className={"flex items-center gap-[2] text-red-400/70 text-sm mb-2 mt-2 pl-2.5"}>
                                            <X width={22} height={22}/> {errors.subject.message}
                                        </p>
                                    )}

                                </div>

                                <div>
                                    <InputGroup
                                    className="py-6">
                                        <InputGroupInput
                                            id={"password"}
                                            placeholder="Password"
                                            type={"text"}
                                            {...register("password")}
                                            aria-label={"Password"}
                                            autoComplete={"Password"}
                                            className={""}
                                        />
                                        <InputGroupAddon
                                            align="inline-start"
                                            className="pl-3">
                                            <Lock width={24} height={24} className="text-muted-foreground group-focus-within/input-group:text-brand-3 transition-colors" />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {errors.password?.message && (
                                        <div>
                                            <p className={"flex items-center gap-[2] text-red-400/70 text-sm mb-2 mt-2 pl-2.5"}>
                                                <X width={22} height={22}/>{errors.password.message}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>


                            <Button type="submit"
                                    className="w-full py-6"
                                    size={"lg"}
                                    disabled={isSubmitting}>
                                <LogIn className={" h-4 w-4 "}/>
                                {isSubmitting ? 'Accesso in corso...' : 'Accedi'}
                            </Button>
                        </form>

                        {/* Registration Link */}

                        <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                            {"Non hai un account? "}
                            <Link
                                href="/signup"
                                className="inline-flex items-center gap-1 font-semibold text-brand-3 hover:text-brand-4 transition-colors">
                                {"Registrati "}
                                <ArrowRight style={{width: "1.2em", height: "1.2em"}} />
                            </Link>
                        </div>
                    </div>
                </GlassSurface>
            </div>
        </div>
    );
}

export default LoginForm;