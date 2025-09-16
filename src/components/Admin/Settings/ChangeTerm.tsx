import { Loader2 } from "lucide-react";
import Modal from "../../../shared/Modals";
import { useQuery } from "@tanstack/react-query";
import {
  activateSchoolTermQuery,
  getSchoolTermQueryOption,
} from "../../../hooks/queryOptions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ChangeTermProps = {
  showTermModal: boolean;
  setShowTermModal: (open: boolean) => void;
};

const ChangeTerm = ({ showTermModal, setShowTermModal }: ChangeTermProps) => {
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [activeTermState, setActiveTerm] = useState();
  const { data: schoolTerms, isPending } = useQuery(getSchoolTermQueryOption());

  const { mutate: activateTerm, isPending: isLoading } =
    activateSchoolTermQuery();

  const findActiveTerm = () => {
    const t: any = schoolTerms?.find((t) => t.is_current === true);
    setActiveTerm(t);
  };

  useEffect(() => {
    findActiveTerm();
  }, [schoolTerms]);

  console.log(selectedTerm);
  const handleActivateTerm = () => {
    if (selectedTerm) {
      console.log(selectedTerm);
      activateTerm(selectedTerm, {
        onSuccess: () => {
          //   console.log("Term activated successfully");
          setShowTermModal(false);
        },
        onError: (error) => {
          console.error("Error activating term:", error);
          toast.error(
            error?.response?.data?.message || "Failed to activate term"
          );
        },
      });
    }
  };

  return (
    <div>
      <Modal
        isOpen={showTermModal}
        onClose={() => setShowTermModal(false)}
        title="Change Active Term"
      >
        <div className="space-y-4">
          <p className="text-gray-600">Select which term should be active:</p>

          <div className="space-y-2">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              schoolTerms?.map((term) => (
                <label
                  key={term.id}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer hover:bg-gray-50 ${
                    selectedTerm === term.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="term"
                    value={term.id}
                    defaultChecked={term.is_current === true}
                    checked={selectedTerm === term.id}
                    onChange={(e) => setSelectedTerm(parseInt(e.target.value))}
                    className="mr-3 text-green-600 focus:ring-green-500"
                  />
                  <span
                    className={`font-medium ${selectedTerm === term.id ? "text-green-900" : "text-gray-900"}`}
                  >
                    {term.name}
                  </span>
                  {term.is_current === true && (
                    <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Currently Active
                    </span>
                  )}
                </label>
              ))
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={() => setShowTermModal(false)}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleActivateTerm}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
              disabled={isLoading || selectedTerm === null}
            >
              {isLoading ? (
                <Loader2 className=" animate-spin" />
              ) : (
                "Activate Term"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChangeTerm;
