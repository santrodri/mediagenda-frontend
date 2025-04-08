export async function getDataImage(file: File): Promise<string> {
    const reader = new FileReader();

    try {
        return await new Promise<string>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error('Erro ao processar o arquivo'));
            reader.readAsDataURL(file);
        });
    } catch (error) {
        throw new Error(`Falha ao ler o arquivo: ${error}`);
    }
}