import { useState } from "react"
import { findPackages as findPackage } from "../services/mem"

export function Search() {
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchPackageName, setSearchPackageName] =
    useState<string>("omnitory-cli")
  const [foundPackages, setFoundPackages] = useState<any[]>([])

  async function handlePackageSearch() {
    if (searchPackageName.length === 0) return
    setSearchLoading(true)
    const pkg: any = await findPackage("npm-" + searchPackageName)

    setSearchLoading(false)
    const list = Object.keys(pkg.versions).map((version) => {
      return {
        date: pkg.time[version]
          .replace("T", " ")
          .replace("Z", "")
          .split(".")[0],
        name: pkg.name,
        version,
        url: pkg.versions[version].dist.tarball,
      }
    })

    setFoundPackages(list)
  }

  return (
    <>
      <div className="join w-full pt-5">
        <div className="form-control">
          <select className="select select-bordered" disabled>
            <option selected>npm</option>
          </select>
        </div>
        <div className="form-control w-full">
          <input
            value={searchPackageName}
            onChange={(e) => setSearchPackageName(e.target.value)}
            type="text"
            placeholder="package-name"
            className="input input-bordered w-full"
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handlePackageSearch}
          disabled={searchLoading}
        >
          {!searchLoading ? (
            "Search"
          ) : (
            <span className="loading loading-infinity loading-lg"></span>
          )}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Publication Date</th>
              <th>Name: Version</th>
              <th>Archive URL</th>
            </tr>
          </thead>
          <tbody>
            {foundPackages.map((pkg) => (
              <tr>
                <td className="whitespace-nowrap">{pkg.date}</td>
                <td className="whitespace-nowrap">
                  <code>
                    "@omnitory/
                    {pkg.name}
                    ": "{pkg.version}
                    ",
                  </code>
                </td>
                <td>
                  <code>"{pkg.url}"</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
