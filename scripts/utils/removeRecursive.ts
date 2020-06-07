import rimraf from "rimraf";

export async function removeRecursive(path: string) {
    return new Promise((resolve, reject) => {
        rimraf(path, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}