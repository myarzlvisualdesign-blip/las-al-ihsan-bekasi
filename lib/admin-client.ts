export async function postJson<T>(
  url: string,
  body: unknown,
): Promise<{ ok: boolean; data: T }> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as T;

  return {
    ok: response.ok,
    data,
  };
}

export async function deleteJson<T>(url: string): Promise<{ ok: boolean; data: T }> {
  const response = await fetch(url, {
    method: "DELETE",
  });
  const data = (await response.json()) as T;

  return {
    ok: response.ok,
    data,
  };
}
