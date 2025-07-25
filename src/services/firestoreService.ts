import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase";

export interface SaleData {
  saleNumber: string;
  clientName: string;
  productType: string;
  enterDate: string;
  glassStatus: string;
  aluminumStatus: string;
}

export const getSales = async (userId: string) => {
  try {
    const salesRef = collection(db, "sales");
    const q = query(salesRef, where("userId", "==", userId));
    const qSnapshot = await getDocs(q);
    const fetchedSales = qSnapshot.docs.map((doc) => ({
      id: doc.id,
      saleNumber: doc.data().saleNumber,
      clientName: doc.data().clientName,
      productType: doc.data().productType,
      enterDate: doc.data().enterDate.toDate().toLocaleDateString("pt-BR"),
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
