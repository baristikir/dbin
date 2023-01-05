import clsx from "clsx";
import { useRef, useState } from "react";
import { Check, Clipboard as ClipboardIcon } from "phosphor-react";
import { Form, Input, Modal, SubmitButton, useZodForm } from "@dbin/ui";
import { z } from "zod";
import { graphql, useMutation } from "react-relay";
import { ConnectWithAgentModalMutation } from "../../../__generated__/ConnectWithAgentModalMutation.graphql";
import { useAtom } from "jotai";
import {
	handleHomeFetchKeyUpdateAtom,
	readHomeFetchKeyAtom,
} from "../../../app/ClientView";

const invitationSchema = z.object({
	url: z.string().url().min(1),
});

interface Props {
	isOpen: boolean;
	setIsOpen(value: boolean): void;
}
export const ConnectWithAgentModal = ({ isOpen, setIsOpen }: Props) => {
	const [fetchKey] = useAtom(readHomeFetchKeyAtom);
	const [, setFetchKey] = useAtom(handleHomeFetchKeyUpdateAtom);

	const form = useZodForm({
		schema: invitationSchema,
	});

	const [connectWithAgent, isInFlight] =
		useMutation<ConnectWithAgentModalMutation>(
			graphql`
				mutation ConnectWithAgentModalMutation($input: ConnectWithAgentInput!) {
					acceptInvitation(input: $input)
				}
			`
		);

	return (
		<Modal isOpen={isOpen} title="Connect With Other Agent" setOpen={setIsOpen}>
			<div className="w-full p-5">
				<div className="w-full rounded-lg  bg-gray-50 px-3 py-3 dark:bg-gray-700">
					<div className="relative mt-1">
						<Form
							form={form}
							onSubmit={({ url }) => {
								return new Promise((res, rej) =>
									setTimeout(() => {
										connectWithAgent({
											variables: {
												input: {
													url,
												},
											},
											updater: (cache, data) => {
												if (data.acceptInvitation) {
													cache.invalidateStore();
													setFetchKey(fetchKey + 1);
													form.reset();
													return res(setIsOpen(false));
												}

												rej("Connection failed.");
											},
										});
									}, 2000)
								);
							}}
						>
							<Input
								label="Invitation URL"
								placeholder="Paste Invitation URL here"
								{...form.register("url")}
							/>

							<SubmitButton variant="system-contrast">Connect With Agent</SubmitButton>
						</Form>
					</div>
				</div>

				<div className="mt-4 px-4">
					<ul className="flex list-disc flex-col gap-2">
						<li className="text-sm">
							Die Einladungs URL wird von anderen Agents benötigt, um eine Verbindung
							mit dem <b>Legal Authority Agent</b> herstellen zukönnen.
						</li>
						<li className="text-sm">
							Nur über Verbindungen können{" "}
							<code
								className="text-radix-red-10 rounded-md bg-gray-100 px-2 py-1 font-medium"
								style={{
									fontFamily: "DejaVu Sans Mono, MonoLisa, Consolas, monospace",
								}}
							>
								Credentials
							</code>{" "}
							übertragen, akzeptiert oder vorgestellt werden.
						</li>
					</ul>
				</div>
			</div>
		</Modal>
	);
};
