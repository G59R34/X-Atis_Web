interface MetarData {
  raw_text: string;
  station_id: string;
  observation_time: string;
  temp_c?: number;
  dewpoint_c?: number;
  wind_dir_degrees?: number;
  wind_speed_kt?: number;
  visibility_statute_mi?: number;
  altim_in_hg?: number;
  flight_category?: string;
}

export async function fetchMetar(stationId: string): Promise<MetarData> {
  try {
    // Using a CORS proxy to handle cross-origin requests
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=json&stationString=${stationId}&hoursBeforeNow=2`;
    
    const response = await fetch(corsProxy + apiUrl, {
      headers: {
        'Origin': window.location.origin
      }
    });
    
    if (!response.ok) {
      console.error('API Response not OK:', {
        status: response.status,
        statusText: response.statusText
      });
      throw new Error(`Failed to fetch METAR data (Status: ${response.status})`);
    }

    const jsonData = await response.json();
    
    if (!jsonData?.response?.data?.METAR || jsonData.response.data.METAR.length === 0) {
      throw new Error('No METAR data found for this station');
    }

    const metar = jsonData.response.data.METAR[0];
    return {
      raw_text: metar.raw_text,
      station_id: metar.station_id,
      observation_time: metar.observation_time,
      temp_c: metar.temp_c,
      dewpoint_c: metar.dewpoint_c,
      wind_dir_degrees: metar.wind_dir_degrees,
      wind_speed_kt: metar.wind_speed_kt,
      visibility_statute_mi: metar.visibility_statute_mi,
      altim_in_hg: metar.altim_in_hg,
      flight_category: metar.flight_category
    };
  } catch (error) {
    console.error('Error fetching METAR:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch METAR data');
  }
} 