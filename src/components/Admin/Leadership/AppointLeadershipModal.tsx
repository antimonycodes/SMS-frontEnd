import { useQuery } from "@tanstack/react-query";
import Modal from "../../../shared/Modals";
import Button from "../../ui/Button";
import { getStudentsQuery } from "../../../hooks/useStudent";
import { getLeadershipRolesQuery } from "../../../hooks/leadership";

const AppointLeadershipModal = ({ openModal, closeModal }: any) => {
  const { data } = useQuery(getStudentsQuery(1, 10000));
  const { data: roles } = useQuery(getLeadershipRolesQuery());
  const students = data?.data?.students;
  console.log(students);
  console.log(roles);
  return (
    <div>
      <Modal
        isOpen={openModal}
        onClose={closeModal}
        title="Appoint student"
        footer={<Button>Appoint</Button>}
      >
        <div></div>
      </Modal>
    </div>
  );
};

export default AppointLeadershipModal;
