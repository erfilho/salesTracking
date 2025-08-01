import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

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

export const getSaleDetails = async (
  saleId: string,
): Promise<SaleDetails | undefined> => {
  try {
    const saleRef = doc(db, "sales", saleId);
    const qSnapshot = await getDoc(saleRef);
    if (qSnapshot.exists()) {
      const fetchSaleDetails: SaleDetails = {
        id: qSnapshot.id,
        saleNumber: qSnapshot.data().saleNumber,
        clientName: qSnapshot.data().clientName,
        productType: qSnapshot.data().productType,
        enterDate: qSnapshot.data().enterDate,
        glassStatus: qSnapshot.data().glassStatus,
        aluminumStatus: qSnapshot.data().aluminumStatus,
      };
      return fetchSaleDetails;
    }
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

export const updateSaleStatus = async(id: string, field: "glassStatus" | "aluminumStatus", newStatus: string) => {
  try {
    const saleRef = doc(db, "sales", id);
    await updateDoc(saleRef, {
      [field]: newStatus,
    });
    console.log("Sale updated! ", id);
  } catch(error){
    console.error("Error on updateSaleStatus function", error);
    throw new Error("Failed to update sale status!");
  }
}