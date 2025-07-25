import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";

import { db } from "../firebase";

export interface SaleData {
  saleNumber: string;
  clientName: string;
  productType: string;
  enterDate: Timestamp;
  glassStatus: string;
  aluminumStatus: string;
}

export interface SaleDetails extends SaleData {
  id: string;
}

export const getSales = async (): Promise<SaleDetails[] | undefined> => {
  try {
    const salesRef = collection(db, "sales");
    const q = query(salesRef);
    const qSnapshot = await getDocs(q);
    const fetchedSales = qSnapshot.docs.map((doc) => ({
      id: doc.id,
      saleNumber: doc.data().saleNumber,
      clientName: doc.data().clientName,
      productType: doc.data().productType,
      enterDate: doc.data().enterDate,
      glassStatus: doc.data().glassStatus,
      aluminumStatus: doc.data().aluminumStatus,
    }));
    return fetchedSales;
  } catch (error) {
    console.error("Error on getSales function", error);
    throw new Error("Failed to get sales!");
  }
};

export const saveSale = async (saleData: SaleData) => {
  try {
    const saleRef = await addDoc(collection(db, "sales"), saleData);

    console.log("Transcription saved with ID: ", saleRef.id);
    return saleRef.id;
  } catch (error) {
    console.error("Error on saveSale function", error);
    throw new Error("Failed to save sale!");
  }
};

export const deleteSales = async (id: string) => {
  try {
    const saleRef = doc(db, "sales", id);
    await deleteDoc(saleRef);
    console.log("Sale deleted with ID: ", id);
  } catch (error) {
    console.error("Error on deleteSales function", error);
    throw new Error("Failed to delete sale!");
  }
};
