import { useState } from "preact/hooks"
import { findPackages as findPackage } from "../services/mem"

export function Search() {
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchPackageName, setSearchPackageName] =
    useState<string>("example-project")
  const [foundPackages, setFoundPackages] = useState<any[]>([])

  async function handlePackageSearch() {
    if (searchPackageName.length === 0) return
    setSearchLoading(true)
    const pkg: any = await findPackage(searchPackageName)

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
      <div class="join w-full pt-5">
        <div class="form-control">
          <select class="select select-bordered">
            <option selected>npm</option>
            <option disabled>cargo (N/A)</option>
            <option disabled>pip (N/A)</option>
          </select>
        </div>
        <div class="form-control w-full">
          <input
            value={searchPackageName}
            onChange={(e: any) => setSearchPackageName(e.target.value)}
            type="text"
            placeholder="package-name"
            class="input input-bordered w-full"
          />
        </div>
        <button
          class="btn btn-primary"
          onClick={handlePackageSearch}
          disabled={searchLoading}
        >
          {!searchLoading ? (
            "Search"
          ) : (
            <span class="loading loading-infinity loading-lg"></span>
          )}
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="table table-zebra">
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
                <td class="whitespace-nowrap">{pkg.date}</td>
                <td class="whitespace-nowrap">
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
