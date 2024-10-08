import { useEffect, useState } from "react";

import axios from "../utils/axiosInstance";
import Table from "../components/Tables/Table";

interface CompanyEntry {
    s_no: number;
    company: string;
    country: string;
    country_code: string;
}

export default function SearchCompanyEntries() {
    const [company, setCompany] = useState("");
    const [country, setCountry] = useState("");
    const [companyEntries, setCompanyEntries] = useState<CompanyEntry[]>([]);
    const [filteredEntries, setFilteredEntries] = useState<CompanyEntry[]>([]);
    useEffect(() => {

        async function fetchEntries() {
            const response = await axios.get("/analytics/companies", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            if (response.data.length !== undefined)
                setCompanyEntries(response.data);
        }

        fetchEntries();
    }, []);

    const getFilteredEntries = () => {
        if (!company && !country) {
            setFilteredEntries([])
            return
        }
        const companies = companyEntries.filter(
            (entry) =>
                (
                    entry.company.toLowerCase().includes(company.toLowerCase()) ||
                    entry.s_no.toString().includes(company.toLowerCase())
                ) &&
                (
                    entry.country_code.toLowerCase().includes(country.toLowerCase()) ||
                    entry.country.toLowerCase().includes(country.toLowerCase())
                )
        );
        setFilteredEntries(companies);
    }

    useEffect(() => {
        getFilteredEntries();
    }, [company, country, companyEntries]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col gap-3 w-[70%] bg-white p-3 rounded-lg">
                <h1 className="text-center font-bold text-2xl">Search Company Entries</h1>
                <div className="flex gap-4 justify-center">
                    <input
                        type="text"
                        placeholder="Company ID/name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={company} onChange={(e) => setCompany(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Country code/name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={country} onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
            </div>
            {/* <div>Entries matching the query</div> */}
            {filteredEntries.length === 0 ? (
                <div className="w-full h-[70vh] text-lg flex justify-center items-center">No entries found</div>
            ) : (
                <Table companies={filteredEntries} />
            )}
        </div>
    );
}
