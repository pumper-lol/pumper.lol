"use client";
import { useCreateCoinForm } from "@/hooks/createCoinForm";

export function FormCoinCreate() {
  const { setField, handleSubmit, setImage, validationErrors, loading } =
    useCreateCoinForm();

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 text-white">
        <p className="text-yellow-500 text-center">
          Note: coin data cannot be changed after creation.
        </p>

        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-semibold text-green-500"
            htmlFor="name"
          >
            name
          </label>
          <input
            className="bg-green-500 bg-opacity-15 border border-slate-200 rounded-md p-2"
            id="name"
            name="name"
            onInput={setField}
            placeholder="Enter token name"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-semibold text-green-500"
            htmlFor="symbol"
          >
            symbol
          </label>
          <input
            className="bg-green-500 bg-opacity-15 border border-slate-200 rounded-md p-2"
            id="symbol"
            name="symbol"
            onInput={setField}
            placeholder="Enter token symbol"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-semibold text-green-500"
            htmlFor="description"
          >
            description
          </label>
          <textarea
            className="bg-green-500 bg-opacity-15 border border-slate-200 rounded-md p-2"
            id="description"
            name="description"
            onInput={setField}
            placeholder="Enter description"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-semibold text-green-500"
            htmlFor="image"
          >
            image
          </label>
          <input
            className="bg-green-500 bg-opacity-15 border border-slate-200 rounded-md p-2"
            id="image"
            name="image"
            onChange={setImage}
            placeholder="Enter description"
            type="file"
            accept="image/jpeg, image/png, image/gif"
          />
        </div>

        <p className="text-yellow-500 text-center mt-4">Community Links</p>

        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-semibold text-green-500"
            htmlFor="twitter"
          >
            twitter url (optional)
          </label>
          <input
            className="bg-green-500 bg-opacity-15 border border-slate-200 rounded-md p-2"
            id="twitter"
            name="twitterUrl"
            onInput={setField}
            placeholder="Enter twitter url"
            type="text"
          />
        </div>

        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-semibold text-green-500"
            htmlFor="telegram"
          >
            telegram url (optional)
          </label>
          <input
            className="bg-green-500 bg-opacity-15 border border-slate-200 rounded-md p-2"
            id="telegram"
            name="telegramUrl"
            onInput={setField}
            placeholder="Enter telegram url"
            type="text"
          />
        </div>

        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-semibold text-green-500"
            htmlFor="discord"
          >
            discord url (optional)
          </label>
          <input
            className="bg-green-500 bg-opacity-15 border border-slate-200 rounded-md p-2"
            id="discord"
            name="discordUrl"
            onInput={setField}
            placeholder="Enter discord url"
            type="text"
          />
        </div>

        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-semibold text-green-500"
            htmlFor="website"
          >
            website (optional)
          </label>
          <input
            className="bg-green-500 bg-opacity-15 border border-slate-200 rounded-md p-2"
            id="website"
            name="websiteUrl"
            onInput={setField}
            placeholder="Enter website url"
            type="text"
          />
        </div>

        {validationErrors?.length ? (
          <div className="bg-red-500 p-4">
            <p className="font-medium mb-2">Validation error</p>
            <ul>
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}

        <div className="">
          <button
            className="bg-green-500 hover:bg-opacity-15 disabled:bg-opacity-5 hover:text-white text-green-950 font-semibold p-2 rounded-md block w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Pumping 🚀"}
          </button>

          <p className="text-yellow-500 text-sm text-center mt-2">
            When your coin completes its bonding curve you receive 250,000,000
            EDU
          </p>
        </div>
      </div>
    </form>
  );
}
