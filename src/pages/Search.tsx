import { useEffect, useRef, useState } from "react";

import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

interface CompanyEntry {
    s_no: string;
    company: string;
    country_code: string;
}

export default function SearchCompanyEntries() {
    const [companyName, setCompanyName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [companyEntries, setCompanyEntries] = useState<CompanyEntry[]>([]);
    const navigate = useNavigate();
    const timeoutRef = useRef<number | null>(null);
    useEffect(() => {
        if (!companyName && !countryCode) return;

        const ac = new AbortController();
        async function fetchEntries() {
            // todo: replace with actual API endpoint
            const response = await axios.get("http://localhost:8000/search", {
                params: {
                    company: companyName,
                    country_code: countryCode,
                },
                signal: ac.signal,
            });
            if (response.data.length !== undefined)
                setCompanyEntries(response.data);
        }
        timeoutRef.current = setTimeout(fetchEntries, 500);
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            ac.abort();
        };
    }, [companyName, countryCode]);

    function handleEntryClick(entry: CompanyEntry) {
        console.log(entry);
        navigate(`/company/${entry.s_no}`);
    }

    return (
        <div>
            <h1>Search Company Entries</h1>
            <input
                type="text"
                placeholder="Company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Country code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
            />
            <div>Entries matching the query</div>
            {companyEntries.length === 0 ? (
                <p>No entries found</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>S. No</th>
                            <th>Company</th>
                            <th>Country Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companyEntries.map((entry) => (
                            <tr
                                key={entry.s_no}
                                onClick={() => handleEntryClick(entry)}
                            >
                                <td>{entry.s_no}</td>
                                <td>{entry.company}</td>
                                <td>{entry.country_code}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
