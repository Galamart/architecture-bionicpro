import React, { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';

const ReportPage: React.FC = () => {
  const { keycloak, initialized } = useKeycloak();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useState<{ user_id: string; report: string }[]>([]);

  const downloadReport = async () => {
    if (!keycloak?.token) {
      setError('Not authenticated');
      return;
    }

    console.log('Sending Token:', keycloak.token);

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/reports`, {
        method: "GET",
        mode: "cors", // Обязательно для CORS
        credentials: "include", // Если API требует авторизации через cookies
        headers: {
          'Authorization': `Bearer ${keycloak.token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      console.log('Response:', response);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched Reports:", data);
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!initialized) {
    return <div>Loading 2 ...</div>;
  }

  if (!keycloak.authenticated) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <button
              onClick={() =>
                  keycloak.login({
                    redirectUri: window.location.origin
                  })
              }
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
    );
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Usage Reports</h1>

        <button
          onClick={downloadReport}
          disabled={loading}
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Generating Report...' : 'Download Report'}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {reports.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Fetched Reports:</h2>
              <ul className="bg-gray-50 p-4 rounded shadow-md">
                {reports.map((report, index) => (
                    <li key={index} className="p-2 border-b last:border-none">
                      <p className="text-sm text-gray-500">User ID: {report.user_id}</p>
                      <p className="text-lg font-medium">{report.report}</p>
                    </li>
                ))}
              </ul>
            </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;