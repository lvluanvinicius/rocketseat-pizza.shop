import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: 254805AERD</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                <span className="font-medium text-muted-foreground">
                  Pedente
                </span>
              </div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">Cliente</TableCell>
            <TableCell className="flex justify-end font-medium">
              Luan Vinicius Paiva dos Santos
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">Telefone</TableCell>
            <TableCell className="flex justify-end font-medium">
              (14) 998758-8554
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">E-mail</TableCell>
            <TableCell className="flex justify-end font-medium">
              lvluansantos@gmail.com
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              Realizado há
            </TableCell>
            <TableCell className="flex justify-end font-medium text-muted-foreground">
              15 minutos
            </TableCell>
          </TableRow>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Pizza Frango</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">R$ 45,00</TableCell>
              <TableCell className="text-right">R$ 90,00</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Coca Cola 2L</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">R$ 10,00</TableCell>
              <TableCell className="text-right">R$ 10,00</TableCell>
            </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do Pedido</TableCell>
              <TableCell className="text-right font-medium">
                R$ 100,00
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}
