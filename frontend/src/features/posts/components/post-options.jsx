import { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { toast } from "sonner";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useRemovePost } from "../queries";
import { useGetProfile } from "@/features/auth";

const MODALS = {
	REMOVE: "remove",
};

export const PostOptions = ({ post }) => {
	const [modal, setModal] = useState("");

	const user = useGetProfile();
	const remove = useRemovePost();

	const handleRemove = () => {
		remove.mutate(post.id, {
			onSuccess() {
				setModal("");
				toast.success("Post removed successfully");
			},
			onError(error) {
				toast.error(error.message);
			},
		});
	};

	return (
		<>
			<Dropdown>
				<Dropdown.Toggle as="button" className="btn btn-sm btn-outline-secondary">
					<EllipsisVerticalIcon
						style={{
							width: "20px",
							height: "20px",
						}}
					/>
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{user.isSuccess ? (
						<Dropdown.Item as="button" onClick={() => setModal(MODALS.REMOVE)}>
							Remove
						</Dropdown.Item>
					) : null}
				</Dropdown.Menu>
			</Dropdown>

			<Modal show={modal === MODALS.REMOVE} onHide={() => setModal("")} centered>
				<Modal.Header closeButton>
					<Modal.Title>Remove post?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					This action cannot be undone. This will permanently remove the post and all of its content.
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setModal("")}>
						Close
					</Button>
					<Button variant="danger" onClick={handleRemove} disabled={remove.isPending}>
						{remove.isPending ? "Removing..." : "Remove"}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
