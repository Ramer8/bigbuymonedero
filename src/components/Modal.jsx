import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import SendIcon from "@mui/icons-material/Send"
import { Stack, Alert } from "@mui/material"

const style = {
  position: "absolute",
  borderRadius: "12px",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  color: "grey.500",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

export default function NestedModal({
  handleInputChange,
  handleSubmit,
  newObject,
  concept,
  open,
  setOpen,
  error,
}) {
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 400,
            textAlign: "center",
            width: {
              xs: 170,
              sm: 400,
              md: 400,
              lg: 500,
              xl: 500,
            },
          }}
        >
          {concept ? (
            <h2 id="output-modal-title">Ingrese monto a extraer</h2>
          ) : (
            <h2 id="input-modal-title">Ingrese monto a depositar</h2>
          )}

          <div>
            <form onSubmit={handleSubmit}>
              <TextField
                label="€"
                name="amount"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={newObject?.amount}
                onChange={handleInputChange}
                variant="standard"
                size="big"
              />

              <IconButton
                aria-label="SendIcon"
                size="medium"
                color="primary"
                type="submit"
                sx={{
                  mx: 1,
                  my: 1,
                }}
              >
                <SendIcon fontSize="small" />
              </IconButton>
            </form>
            {error.error && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{error.text}</Alert>
              </Stack>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  )
}
