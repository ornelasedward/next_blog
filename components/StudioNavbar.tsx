import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

// Adds markup and invokes renderDefault()
function MyEnhancedNavbar(props: any) {
  return (
    <div>
      <div className="flex items-center justify-between py-10 px-4">
        <Link href="/" className="text-white flex items-center">
          <ArrowUturnLeftIcon className="h-6 w-6 text-white mr-2" />
          Go to Website
        </Link>
      </div>
      <>{props.renderDefault(props)}</>
    </div>
  );
}

export default MyEnhancedNavbar;
