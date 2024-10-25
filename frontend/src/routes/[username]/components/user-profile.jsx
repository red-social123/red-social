import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Image, Modal, Placeholder, Ratio, Row, Stack } from "react-bootstrap";
import { useGetUserByUsername } from "@/features/users";
import { HTTP_STATUS } from "@/shared/utils";
import { useGetProfile } from "@/features/auth";
import { EditProfile } from "./edit-profile";

const MODALS = {
	VIEW_PROFILE: "view-profile",
	EDIT_PROFILE: "edit-profile",
};

export const UserProfile = () => {
	const [modals, setModals] = useState("");

	const { username } = useParams();

	const user = useGetProfile();
	const { data: account, isPending, isError, error } = useGetUserByUsername(username);

	return isPending ? (
		<Stack>
			<Placeholder style={{ width: "120px", height: "120px", borderRadius: "50%" }} />

			<Row className="mt-2">
				<Col>
					<Stack gap={1}>
						<Placeholder xs={5} size="lg" />
						<Placeholder xs={2} />
					</Stack>
				</Col>
				<Col className="text-end">
					<Placeholder.Button
						variant="primary"
						xs={3}
						style={{
							height: "32px",
						}}
					/>
				</Col>
			</Row>
		</Stack>
	) : isError ? (
		<div className="p-5 text-center text-secondary">
			<p className="m-0">{error.status === HTTP_STATUS.NOT_FOUND ? "User not found." : "Something went wrong."}</p>
		</div>
	) : (
		<>
			<Stack>
				<Ratio
					aspectRatio="1x1"
					style={{
						maxWidth: "120px",
						maxHeight: "120px",
					}}
					role="button"
					className="h-100 w-100"
					onClick={() => setModals(MODALS.VIEW_PROFILE)}
				>
					{account.images ? (
						<Image src={account.images} roundedCircle fluid className="object-fit-contain border" />
					) : (
						<div className="bg-secondary w-100 h-100 rounded-circle d-flex justify-content-center align-items-center">
							<span className="text-white fs-1 fw-bold">
								{[account.first_name, account.last_name].map((n) => n.charAt(0).toUpperCase()).join("")}
							</span>
						</div>
					)}
				</Ratio>
				<Row>
					<Col>
						<h2 className="mb-0">
							{account.first_name} {account.last_name}
						</h2>
						<p className="m-0 text-muted">@{account.username}</p>
					</Col>
					<Col className="text-end">
						{user.isSuccess ? (
							user.data.username === username ? (
								<Button variant="primary" size="sm" onClick={() => setModals(MODALS.EDIT_PROFILE)}>
									Edit Profile
								</Button>
							) : null
						) : null}
					</Col>
				</Row>
			</Stack>

			<Modal show={modals === MODALS.VIEW_PROFILE} onHide={() => setModals("")} centered>
				<Modal.Header closeButton>
					<Modal.Title>
						{account.first_name} {account.last_name}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Ratio aspectRatio="1x1" className="h-100 w-100">
						{account.images ? (
							<Image src={account.images} roundedCircle fluid className="object-fit-contain border" />
						) : (
							<div className="bg-secondary w-100 h-100 rounded-circle d-flex justify-content-center align-items-center">
								<span className="text-white fs-1 fw-bold">
									{[account.first_name, account.last_name].map((n) => n.charAt(0).toUpperCase()).join("")}
								</span>
							</div>
						)}
					</Ratio>
				</Modal.Body>
			</Modal>

			{user.isSuccess ? (
				<EditProfile show={modals === MODALS.EDIT_PROFILE} onHide={() => setModals("")} user={user.data} />
			) : null}
		</>
	);
};
