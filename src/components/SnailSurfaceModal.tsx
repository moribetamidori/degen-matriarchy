import SnailSurfaceVisualization from "@/components/SnailSurfaceVisualization";
interface SnailSurfaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SnailSurfaceModal: React.FC<SnailSurfaceModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-[80vw] h-[80vh] border border-[#1c41f1] rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1c41f1] hover:text-[#4361ee] z-10"
        >
          ✕
        </button>
        <div className="w-full h-full">
          <SnailSurfaceVisualization />
        </div>
      </div>
    </div>
  );
};

export default SnailSurfaceModal;
