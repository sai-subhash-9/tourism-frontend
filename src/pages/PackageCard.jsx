// src/components/PackageCard.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * Backwards-compatible PackageCard
 * - Works with old package objects (packageName, packageImages, packageDescription, _id)
 * - Also works with new objects (name, image, description, slug)
 *
 * Props:
 * - packageData: object
 * - type: "package" (default) | "state" | "place"
 *
 * Behaviour:
 * - Link destination adapts:
 *    - package: /package/:id  (keeps old behavior)
 *    - state:   /states/:slug
 *    - place:   /places/:slug
 */

const PackageCard = ({ packageData = {}, type = "package" }) => {
  // normalize fields for display (support both old and new shapes)
  const id = packageData._id || packageData.id || "";
  const name =
    packageData.packageName || packageData.name || packageData.title || "Unknown";
  const description =
    packageData.packageDescription ||
    packageData.shortDescription ||
    packageData.description ||
    "";
  const // prefer array for packageImages fallback to single image
    images =
      packageData.packageImages ||
      (packageData.images ? packageData.images : null) ||
      (packageData.image ? [packageData.image] : []);
  const image = (images && images.length > 0 && images[0]) || packageData.packageImage || packageData.image || "/images/placeholder.jpg";
  const slug = packageData.slug || packageData.stateSlug || packageData.packageSlug || "";

  // compute link target based on type
  let to = `/package/${id}`; // old default
  if (type === "state" && slug) to = `/states/${slug}`;
  else if (type === "place" && slug) to = `/places/${slug}`;
  else if (type === "place" && id) to = `/places/${id}`;
  else if (type === "state" && id) to = `/states/${id}`;

  return (
    <Link to={to} className="w-full">
      <div className="w-full bg-white border flex flex-col items-center p-3 rounded shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
        <img
          className="w-full h-[220px] object-cover rounded border hover:scale-105 transition-all duration-300"
          src={image}
          alt={name}
          onError={(e) => (e.target.src = "/images/placeholder.jpg")}
        />

        <div className="w-full flex flex-col my-2">
          <p className="font-semibold text-lg capitalize w-[90%] xsm:w-[250px] truncate">
            {name}
          </p>

          {description && (
            <p className="text-gray-700 text-sm w-[90%] line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
