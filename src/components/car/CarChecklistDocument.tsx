"use client";

import { ICarDocument } from "@/types/car";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Icon } from "@iconify/react/dist/iconify.js";

const DocumentRow = ({
  label,
  isAvailable,
}: {
  label: string;
  isAvailable: boolean;
}) => (
  <TableRow>
    <TableCell className="p-2 md:p-3">{label}</TableCell>
    <TableCell className="p-2 md:p-3">
      <div className={isAvailable ? "text-green-500" : "text-red-500"}>
        <Icon
          icon={
            isAvailable ? "solar:check-circle-bold" : "solar:close-circle-bold"
          }
        />
      </div>
    </TableCell>
  </TableRow>
);

export default function CarChecklistDocument({
  carDocument,
}: {
  carDocument: ICarDocument | undefined;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="p-2 md:p-3">Dokumen</TableHead>
            <TableHead className="p-2 md:p-3">Kelengkapan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <DocumentRow
            label="BPKB"
            isAvailable={carDocument?.bpkb_status === 1}
          />
          <DocumentRow
            label="STNK"
            isAvailable={carDocument?.stnk_status === 1}
          />
          <DocumentRow
            label="Faktur"
            isAvailable={carDocument?.invoice_status === 1}
          />
          <DocumentRow
            label="NIK/VIN"
            isAvailable={carDocument?.vin_status === 1}
          />
          <DocumentRow
            label="Form A (CBU)"
            isAvailable={carDocument?.form_a_status === 1}
          />
          <DocumentRow
            label="FC an STNK"
            isAvailable={carDocument?.stnk_fotocopy_status === 1}
          />
          <DocumentRow
            label="Buku Manual"
            isAvailable={carDocument?.manual_book_status === 1}
          />
          <DocumentRow
            label="Buku Servis"
            isAvailable={carDocument?.service_book_status === 1}
          />
          <DocumentRow
            label="Kunci Cadangan"
            isAvailable={carDocument?.backup_key_status === 1}
          />
          <DocumentRow
            label="Blanko Kwitansi"
            isAvailable={carDocument?.receipt_form_status === 1}
          />
          <DocumentRow
            label="SPH"
            isAvailable={carDocument?.declaration_right_status === 1}
          />
          <DocumentRow
            label="Toolkits"
            isAvailable={carDocument?.toolkit_status === 1}
          />
        </TableBody>
      </Table>
    </div>
  );
}
