import Button from "../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
interface PageHeaderProps {
  title?: string;
  sub?: string;
  button?: boolean;
  buttonText?: string;
  buttonClick?: () => void;
  editButton?: boolean;
  deleteButton?: boolean;
}
const PageHeader = ({
  title,
  sub,
  button = true,
  editButton = false,
  deleteButton = false,
  buttonText,
  buttonClick,
}: PageHeaderProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      {!id ? (
        <div className=" flex items-center justify-between w-full">
          <div>
            <h1 className=" text-brand-900 font-semibold text-4xl">{title}</h1>
            <p className=" text-gray-600 font-medium">{sub}</p>
          </div>
          {/*  */}
          {button && (
            <Button variant="primary" onClick={buttonClick}>
              {buttonText}
            </Button>
          )}
        </div>
      ) : (
        <div>
          <div className=" flex items-center justify-between w-full">
            <div
              className=" flex items-center text-brand-900 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
              <h1 className=" text-brand-900 font-medium text-">{title}</h1>
            </div>
            {/*  */}
            <div className=" flex items-center gap-4">
              {editButton && (
                <Button variant="outline" onClick={buttonClick}>
                  Edit
                </Button>
              )}
              {deleteButton && (
                <Button variant="delete" onClick={buttonClick}>
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
